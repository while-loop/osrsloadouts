package stores

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"time"
)

type ItemQuantity map[string]*int32

type Author struct {
	Id       string `json:"id," bson:"id"`
	Username string `json:"username," bson:"username"`
}

type Loadout struct {
	Id          string                  `json:"id," bson:"_id"`
	Title       string                  `json:"title" bson:"title"`
	Author      Author                  `json:"author" bson:"author"`
	Description string                  `json:"description" bson:"description"`
	Created     time.Time               `json:"created" bson:"created"`
	Updated     time.Time               `json:"updated" bson:"updated"`
	Copies      uint32                  `json:"copies" bson:"copies"`
	Favorites   uint32                  `json:"favorites" bson:"favorites"`
	Favorited   bool                    `json:"favorited" bson:"favorited"`
	Views       uint32                  `json:"views" bson:"views"`
	Tags        []string                `json:"tags" bson:"tags"`
	Parent      string                  `json:"parent" bson:"parent"`
	Inventory   [7][4]ItemQuantity      `json:"inventory" bson:"inventory"`
	Equipment   map[string]ItemQuantity `json:"equipment" bson:"equipment"`
}

var validLoadoutKeys = []string{"title", "description", "updated", "tags", "inventory", "equipment"}

type LoadoutResponse struct {
	Page     uint32     `json:"page"`
	Limit    uint32     `json:"limit"`
	Total    uint32     `json:"total"`
	Loadouts []*Loadout `json:"loadouts"`
}

type LoadoutStore interface {
	// get loadout for user. also incr view if havent seen this ip or uid
	Get(ctx context.Context, uid, ip, id string) (*Loadout, *errors.ApiError)

	Delete(ctx context.Context, id string) *errors.ApiError

	// copy and reset all stats info
	Copy(ctx context.Context, id string, author Author) (*Loadout, *errors.ApiError)

	// update `updated` field
	Update(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError)

	// todo err checking for invy and equip slots
	// created, update times
	Create(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError)

	// updated field
	GetAll(ctx context.Context, p *Pagination) (*LoadoutResponse, *errors.ApiError)
	Search(ctx context.Context) ([]*Loadout, *errors.ApiError)

	// get all loadouts by a user
	GetByUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError)

	// get all loaduts for a user. all viewed, favourited, and owned
	GetForUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError)
}

type mongoLoadout struct {
	coll *mongo.Collection
}

const loadoutColl = "loadouts"

func NewLoadoutStore(db *mongo.Database) LoadoutStore {
	return &mongoLoadout{
		coll: db.Collection(loadoutColl),
	}
}

func (m *mongoLoadout) Create(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError) {
	l.Created = time.Now()
	l.Updated = l.Created

	id, err := Create(ctx, m.coll, l, true)
	if err != nil {
		return nil, err
	}

	l.Id = id
	return l, nil
}

func (m *mongoLoadout) Get(ctx context.Context, uid, ip, id string) (*Loadout, *errors.ApiError) {
	l := new(Loadout)
	err := Get(ctx, m.coll, id, &l)
	if err != nil {
		return nil, err
	}

	// todo update view count in view collections
	// check if user has favorited from favorite collection

	return l, nil
}

func (m *mongoLoadout) Update(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError) {
	newM := utils.FilterM(utils.ToM(l), validLoadoutKeys)
	newM["updated"] = time.Now()
	err := Update(ctx, m.coll, l.Id, newM, &l)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (m *mongoLoadout) Delete(ctx context.Context, id string) *errors.ApiError {
	return Delete(ctx, m.coll, id)
}

func (m *mongoLoadout) Copy(ctx context.Context, id string, author Author) (*Loadout, *errors.ApiError) {
	l, err := m.Get(ctx, "", "", id)
	if err != nil {
		return nil, err
	}

	l.Author = author
	l.Parent = id
	l.Created = time.Now()
	l.Updated = l.Created
	l.Copies = 0
	l.Favorites = 0
	l.Views = 0

	l, err = m.Create(ctx, l)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (m *mongoLoadout) getAll(ctx context.Context, filter bson.M, p *Pagination) (*LoadoutResponse, *errors.ApiError) {
	res := &LoadoutResponse{
		Page:     p.Page,
		Limit:    p.Limit,
		Total:    0,
		Loadouts: nil,
	}

	opts := options.Find().SetSkip(int64(p.Page * p.Limit)).SetLimit(int64(p.Limit))
	if p.Sort != "" {
		opts.SetSort(p.GetSort())
	}

	cur, err := m.coll.Find(ctx, filter, opts)
	if err != nil {
		return nil, errors.NewApif(http.StatusInternalServerError, err, "unable to get all loadouts")
	}

	if err := cur.All(ctx, &res.Loadouts); err != nil {
		return nil, errors.NewApif(http.StatusInternalServerError, err, "failed to decode all loadouts")
	}

	count, err := m.coll.CountDocuments(ctx, filter)
	if err != nil {
		log.Warnf("unable to get doc count for loadouts: %v", err)
		count = int64(len(res.Loadouts))
	}

	res.Total = uint32(count)
	return res, nil
}

func (m *mongoLoadout) GetAll(ctx context.Context, p *Pagination) (*LoadoutResponse, *errors.ApiError) {
	return m.getAll(ctx, bson.M{}, p)
}

func (m *mongoLoadout) GetByUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError) {

	filter := bson.M{"author.id": id}
	res, err := m.getAll(ctx, filter, p)
	if err != nil {
		err.Nice = "unable to get loadouts by user " + id
		return nil, err
	}

	return res, nil
}

func (m *mongoLoadout) GetForUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError) {
	panic("implement me")
}

func (m *mongoLoadout) Search(ctx context.Context) ([]*Loadout, *errors.ApiError) {
	panic("implement me")
}
