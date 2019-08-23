package stores

import (
	"context"
	"firebase.google.com/go/auth"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"time"
)

type User struct {
	Id       string    `json:"id" bson:"_id"`
	Username string    `json:"username" bson:"username"`
	Rsn      string    `json:"rsn" bson:"rsn"`
	Created  time.Time `json:"created" bson:"created"`
	Updated  time.Time `json:"updated" bson:"updated"`
}

var validUserKeys = []string{"username", "rsn", "updated"}

type UserStore interface {
	Get(ctx context.Context, id string) (*User, *errors.ApiError)
	GetByUsername(ctx context.Context, username string) (*User, *errors.ApiError)
	Delete(ctx context.Context, id string) *errors.ApiError
	Update(ctx context.Context, id string, props bson.M) (*User, *errors.ApiError)
	Create(ctx context.Context, user *User) (*User, *errors.ApiError)
}

type mongoUser struct {
	coll  *mongo.Collection
	fauth *auth.Client
}

const userColl = "users"

func NewUserStore(db *mongo.Database, auth *auth.Client) UserStore {
	return &mongoUser{
		coll:  db.Collection(userColl),
		fauth: auth,
	}
}

func (m *mongoUser) Create(ctx context.Context, u *User) (*User, *errors.ApiError) {
	u.Created = time.Now()
	u.Updated = u.Created
	if u.Username == "" {
		u.Username = GetRandomName(0)
	}

	id, err := Create(ctx, m.coll, u, false)
	if err != nil {
		return nil, err
	}

	m.setUsername(ctx, id, u.Username)

	u.Id = id
	return u, nil
}

func (m *mongoUser) Get(ctx context.Context, id string) (*User, *errors.ApiError) {
	return m.get(ctx, bson.D{{Key: "_id", Value: id}}, "id")
}

func (m *mongoUser) GetByUsername(ctx context.Context, username string) (*User, *errors.ApiError) {
	return m.get(ctx, bson.D{{Key: "username", Value: username}}, "username")
}

func (m *mongoUser) get(ctx context.Context, filter bson.D, id string) (*User, *errors.ApiError) {
	res := m.coll.FindOne(ctx, filter)
	if res.Err() != nil {
		return nil, errors.NewApif(http.StatusNotFound, res.Err(), "unable to find user %s", id)
	}

	u := new(User)
	err := res.Decode(u)
	if err != nil {
		return nil, errors.NewApif(http.StatusInternalServerError, err, "failed to decode user %s", id)
	}

	return u, nil
}

func (m *mongoUser) Delete(ctx context.Context, id string) *errors.ApiError {
	return Delete(ctx, m.coll, id)
}

func (m *mongoUser) Update(ctx context.Context, id string, props bson.M) (*User, *errors.ApiError) {
	props["updated"] = time.Now()

	props = utils.FilterM(props, validUserKeys)
	u := new(User)
	err := Update(ctx, m.coll, id, props, u)
	if err != nil {
		return nil, err
	}

	if username, ok := props["username"]; ok {
		m.setUsername(ctx, id, username.(string))
	}

	// todo update all loadout author usernames
	return u, nil
}
func (m *mongoUser) setUsername(ctx context.Context, id, username string) {
	if err := m.fauth.SetCustomUserClaims(ctx, id, map[string]interface{}{"username": username}); err != nil {
		log.Errorf("Failed to set claims for user %s: %v", id, err)
		// todo logger, this will create data mismatch if failed
	}
}
