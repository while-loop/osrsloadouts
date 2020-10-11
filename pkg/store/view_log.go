package store

import (
	"context"
	"github.com/while-loop/osrsloadouts/pkg/errors"
	"github.com/while-loop/osrsloadouts/pkg/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"strings"
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
	doc := utils.ToM(ViewLog{
		LoadoutId: loadoutId,
		UserId:    uid,
		Created:   time.Now().UTC(),
	})

	_, err := m.coll.InsertOne(ctx, doc)
	if err != nil {
		if strings.Contains(err.Error(), "E11000") {
			return false, nil
		} else {
			return false, errors.Wrapf(err, "failed to inc view %s %s", uid, loadoutId)
		}
	}

	return true, nil
}
