package store

import (
	"context"
	"fmt"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"strings"
	"time"
)

type Stats struct {
	Created time.Time `json:"created" bson:"created"`
}

type UserStats struct {
	UserId    string           `json:"user_id" bson:"_id"`
	Favorites map[string]Stats `json:"favorites" bson:"favorites"`
	Views     map[string]Stats `json:"views" bson:"views"`
}

type UserStatsStore interface {
	Create(ctx context.Context, uid string) *errors.ApiError
	Get(ctx context.Context, uid string) (*UserStats, *errors.ApiError)
	GetFavorites(ctx context.Context, uid string) (map[string]Stats, error)
	SetFavorite(ctx context.Context, uid string, loadoutId string, favorite bool) *errors.ApiError
	SetViewed(ctx context.Context, uid string, loadoutId string) error
}

const userStatsColl = "user_stats"

type mongoUserStats struct {
	coll *mongo.Collection
}

func NewUserStatsStore(db *mongo.Database) UserStatsStore {
	return &mongoUserStats{
		coll: db.Collection(userStatsColl),
	}
}

func (m *mongoUserStats) Create(ctx context.Context, uid string) *errors.ApiError {
	_, err := Create(ctx, m.coll, UserStats{
		UserId:    uid,
		Favorites: map[string]Stats{},
		Views:     map[string]Stats{},
	}, false)

	// if duplicate user_id key, then return no error
	if err.GetError() != nil && strings.Contains(err.GetError().Error(), "E11000") {
		return nil
	}

	return err
}

func (m *mongoUserStats) Get(ctx context.Context, uid string) (*UserStats, *errors.ApiError) {
	us := new(UserStats)
	err := Get(ctx, m.coll, uid, &us)
	if err != nil {
		return nil, err
	}

	return us, nil
}
func (m *mongoUserStats) GetFavorites(ctx context.Context, uid string) (map[string]Stats, error) {
	us, apiErr := m.Get(ctx, uid)
	if apiErr != nil {
		return nil, apiErr.GetError()
	}

	return us.Favorites, nil

}

func (m *mongoUserStats) SetFavorite(ctx context.Context, uid string, loadoutId string, favorite bool) *errors.ApiError {
	return m.setFavorite(ctx, uid, loadoutId, favorite, false)
}

func (m *mongoUserStats) setFavorite(ctx context.Context, uid string, loadoutId string, favorite, retried bool) *errors.ApiError {
	filter := bson.M{"_id": uid}
	verb := "set"
	if !favorite {
		verb = "undo"
	}

	action := bson.M{"favorites." + loadoutId: bson.M{"created": time.Now()}}
	update := bson.M{}
	if favorite {
		update["$set"] = action
	} else {
		update["$unset"] = action
	}

	unableErr := errors.NewApi(
		http.StatusInternalServerError,
		errors.New("failed to %s fav %s %s %t", uid, loadoutId, verb, retried),
		fmt.Sprintf("Unable to %s favorite", verb),
	)

	res, err := m.coll.UpdateOne(ctx, filter, update)
	if err != nil {
		return unableErr
	}

	if res.MatchedCount == 0 {
		if apiErr := m.Create(ctx, uid); apiErr != nil && retried { // check if retried to prevent infinite recursion loops
			return unableErr
		} else if apiErr != nil {
			return apiErr
		} else {
			return m.setFavorite(ctx, uid, loadoutId, favorite, true)
		}
	} else if res.MatchedCount == 1 || res.ModifiedCount == 1 {
		return nil
	}

	return unableErr
}

func (m *mongoUserStats) SetViewed(ctx context.Context, uid string, loadoutId string) error {
	return m.setViewed(ctx, uid, loadoutId, false)
}

func (m *mongoUserStats) setViewed(ctx context.Context, uid string, loadoutId string, retried bool) error {
	filter := bson.M{"_id": uid}

	update := bson.M{
		"$set": bson.M{
			"views." + loadoutId: bson.M{
				"created": time.Now(),
			},
		},
	}

	unableErr := errors.New("failed to mark view %s %s %t", uid, loadoutId, retried)

	res, err := m.coll.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.Wrapf(err, "failed to mark view %s %s %t", uid, loadoutId, retried)
	}

	if res.MatchedCount == 0 {
		if apiErr := m.Create(ctx, uid); apiErr != nil && retried { // check if retried to prevent infinite recursion loops
			return unableErr
		} else if apiErr != nil {
			return errors.Wrapf(apiErr.GetError(), "failed to mark view %s %s %t", uid, loadoutId, retried)
		} else {
			return m.setViewed(ctx, uid, loadoutId, true)
		}
	} else if res.MatchedCount == 1 || res.ModifiedCount == 1 {
		return nil
	}

	return unableErr
}
