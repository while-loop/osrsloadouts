package store

import (
	"context"
	"github.com/google/uuid"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"time"
)

type CounterKey string

const (
	ViewsKey     CounterKey = "views"
	FavoritesKey CounterKey = "favorites"
	CopiesKey    CounterKey = "copies"
)

type ItemQuantity struct {
	Quantity int `json:"quantity," bson:"quantity"`
	Id       *int `json:"id," bson:"id"`
}

type Author struct {
	Id       string `json:"id," bson:"id"`
	Username string `json:"username," bson:"username"`
}

type Loadout struct {
	Id          string                   `json:"id," bson:"_id"`
	Title       string                   `json:"title" bson:"title"`
	Author      Author                   `json:"author" bson:"author"`
	Description string                   `json:"description" bson:"description"`
	Created     time.Time                `json:"created" bson:"created"`
	Updated     time.Time                `json:"updated" bson:"updated"`
	Copies      uint32                   `json:"copies" bson:"copies"`
	Favorites   uint32                   `json:"favorites" bson:"favorites"`
	Favorited   bool                     `json:"favorited" bson:"favorited"`
	Views       uint32                   `json:"views" bson:"views"`
	Tags        []string                 `json:"tags" bson:"tags"`
	Parent      string                   `json:"parent" bson:"parent"`
	Inventory   [7][4]ItemQuantity      `json:"inventory" bson:"inventory"`
	Equipment   map[string]ItemQuantity `json:"equipment" bson:"equipment"`
	RunePouch   [3]ItemQuantity `json:"rune_pouch" bson:"rune_pouch"`
}

func (l *Loadout) Reset() {
	l.Views = 0
	l.Favorites = 0
	l.Copies = 0
	l.Favorited = false
}

var validLoadoutKeys = []string{"title", "description", "updated", "tags", "inventory", "equipment", "rune_pouch"}

type LoadoutResponse struct {
	Page     uint32     `json:"page"`
	Limit    uint32     `json:"limit"`
	Total    uint32     `json:"total"`
	Loadouts []*Loadout `json:"loadouts"`
}

type LoadoutStore interface {
	// get loadout for user. also incr view if havent seen this ip or uid
	Get(ctx context.Context, id string) (*Loadout, *errors.ApiError)

	Delete(ctx context.Context, id string) *errors.ApiError

	// update `updated` field
	Update(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError)

	// todo err checking for invy and equip slots
	// created, update times
	Create(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError)

	CreateAll(ctx context.Context, l []*Loadout) *errors.ApiError

	// updated field
	GetAll(ctx context.Context, p *Pagination) (*LoadoutResponse, *errors.ApiError)

	// get all loadouts by a user
	GetByUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError)

	// get all loaduts for a user. all viewed, favourited, and owned
	GetForUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError)

	// update all username refs for user id
	MigrateUsername(ctx context.Context, userId string, newUsername string) *errors.ApiError

	// update all username refs for user id
	IncrementCounter(ctx context.Context, id string, counter CounterKey, delta int) error
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
	l.Created = time.Now().UTC()
	l.Updated = l.Created

	id, err := Create(ctx, m.coll, l, true)
	if err != nil {
		return nil, err
	}

	l.Id = id
	return l, nil
}

func (m *mongoLoadout) CreateAll(ctx context.Context, ls []*Loadout) *errors.ApiError {
	docs := make([]interface{}, len(ls))
	for i, l := range ls {
		l.Created = time.Now().UTC()
		l.Updated = l.Created
		m := utils.ToM(l)
		m["_id"] = uuid.New().String()
		docs[i] = m
	}

	return CreateAll(ctx, m.coll, docs)
}

func (m *mongoLoadout) Get(ctx context.Context, id string) (*Loadout, *errors.ApiError) {
	l := new(Loadout)
	err := Get(ctx, m.coll, id, &l)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (m *mongoLoadout) Update(ctx context.Context, l *Loadout) (*Loadout, *errors.ApiError) {
	newM := utils.FilterM(utils.ToM(l), validLoadoutKeys)
	newM["updated"] = time.Now().UTC()
	err := Update(ctx, m.coll, l.Id, newM, &l)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (m *mongoLoadout) Delete(ctx context.Context, id string) *errors.ApiError {
	return Delete(ctx, m.coll, id)
}

func (m *mongoLoadout) getAll(ctx context.Context, filter bson.M, p *Pagination) (*LoadoutResponse, *errors.ApiError) {
	res := &LoadoutResponse{
		Page:     p.Page,
		Limit:    p.Limit,
		Total:    0,
		Loadouts: nil,
	}

	opts := options.Find().SetSkip(int64(p.Page * p.Limit)).SetLimit(int64(p.Limit)).SetSort(p.GetSort())

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
	return m.getAll(ctx, p.AddSearch(bson.M{}), p)
}

func (m *mongoLoadout) GetByUser(ctx context.Context, id string, p *Pagination) (*LoadoutResponse, *errors.ApiError) {
	filter := p.AddSearch(bson.M{"author.id": id})
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

func (m *mongoLoadout) MigrateUsername(ctx context.Context, userId string, newUsername string) *errors.ApiError {
	find := bson.M{"author.id": userId}

	update := bson.M{
		"$set": bson.M{
			"author.username": newUsername,
		},
	}

	_, err := m.coll.UpdateMany(ctx, find, update)
	if err != nil {
		return errors.NewApif(http.StatusInternalServerError, err, "failed to update loadout username: %s", newUsername)
	}

	return nil
}

func (m *mongoLoadout) IncrementCounter(ctx context.Context, id string, counter CounterKey, delta int) error {
	find := bson.M{"_id": id}

	update := bson.M{
		"$inc": bson.M{
			string(counter): delta,
		},
	}

	_, err := m.coll.UpdateOne(ctx, find, update)
	if err != nil {
		return errors.Newf("failed to inc loadout %s %d: %v", counter, delta, err)
	}

	return nil
}
