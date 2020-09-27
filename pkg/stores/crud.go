package stores

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"strings"
)

func Create(ctx context.Context, coll *mongo.Collection, in interface{}, setId bool) (string, *errors.ApiError) {
	m := utils.ToM(in)
	if setId {
		m["_id"] = uuid.New().String()
	}

	res, err := coll.InsertOne(ctx, m)
	if err != nil {
		return "", errors.NewApif(http.StatusInternalServerError, err, "failed to create: %v", coll.Name())
	}

	id := ""

	// Convert the object id to it's string counterpart
	switch res.InsertedID.(type) {
	case primitive.ObjectID:
		id = res.InsertedID.(primitive.ObjectID).Hex()
	case string:
		id = res.InsertedID.(string)
	default:
		log.Errorf("unknown insert type %s %t", res.InsertedID, res.InsertedID)
	}

	return id, nil
}

func CreateAll(ctx context.Context, coll *mongo.Collection, in []interface{}) *errors.ApiError {
	_, err := coll.InsertMany(ctx, in)
	if err != nil {
		return errors.NewApif(http.StatusInternalServerError, err, "failed to create all: %v", coll.Name())
	}

	return nil
}

func Get(ctx context.Context, coll *mongo.Collection, id string, out interface{}) *errors.ApiError {
	res := coll.FindOne(ctx, bson.D{{Key: "_id", Value: id}})
	if res.Err() != nil {
		return errors.NewApif(http.StatusNotFound, res.Err(), "unable to find %s %s", coll.Name(), id)
	}

	if err := res.Decode(out); err != nil {
		return errors.NewApif(http.StatusInternalServerError, err, "failed to decode %s %s", coll.Name(), id)
	}

	return nil
}

func Update(ctx context.Context, coll *mongo.Collection, id string, in bson.M, out interface{}) *errors.ApiError {
	update := bson.D{{Key: "$set", Value: in}}
	res := coll.FindOneAndUpdate(ctx, bson.D{{Key: "_id", Value: id}}, update, options.FindOneAndUpdate().SetReturnDocument(options.After))
	if res.Err() != nil {
		if strings.Contains(strings.ToLower(res.Err().Error()), "duplicate key error") {
			return errors.NewApif(http.StatusConflict, res.Err(), "duplicate key for update %s id %s", coll.Name(), id)
		} else {
			return errors.NewApif(http.StatusNotFound, res.Err(), "unable to find and update %s id %s", coll.Name(), id)
		}
	}

	if err := res.Decode(out); err != nil {
		return errors.NewApif(http.StatusInternalServerError, err, "failed to decode %s %s", coll.Name(), id)
	}

	return nil
}

func Delete(ctx context.Context, coll *mongo.Collection, id string) *errors.ApiError {
	res, err := coll.DeleteOne(ctx, bson.D{{Key: "_id", Value: id}})
	if err != nil {
		return errors.NewApif(http.StatusInternalServerError, err, "failed to delete %s id %s", coll.Name(), id)
	}

	if res.DeletedCount <= 0 {
		return errors.NewApi(http.StatusNotFound, fmt.Errorf("%s id %s does not exist", coll.Name(), id), "")
	}

	return nil
}
