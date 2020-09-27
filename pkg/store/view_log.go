package store

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

// todo this should be handled in redis, but we'll keep in mongo for now
type ViewLog struct {
	LoadoutId string    `json:"loadout_id" bson:"loadout_id"`
	UserId    string    `json:"user_id" bson:"user_id"`
	Created   time.Time `json:"created" bson:"created"`
}

type ViewLogStore interface {
	CanIncView(ctx context.Context, uid string, loadoutId string) (bool, error)
}

const viewLogColl = "view_log"

type mongoViewLog struct {
	coll *mongo.Collection
}

func NewViewLogStore(db *mongo.Database) ViewLogStore {
	return &mongoViewLog{
		coll: db.Collection(viewLogColl),
	}
}

func (m *mongoViewLog) CanIncView(ctx context.Context, uid string, loadoutId string) (bool, error) {
	filter := bson.M{
		"loadout_id": loadoutId,
		"user_id":    uid,
	}

	res, err := m.coll.UpdateOne(ctx, filter, bson.M{
		"$set": bson.M{
			"created": time.Now().UTC(),
		},
	}, options.Update().SetUpsert(true))
	if err != nil {
		return false, errors.Wrapf(err, "failed to inc view %s %s", uid, loadoutId)
	}

	return res.MatchedCount == 0 && res.UpsertedCount == 1, nil
}
