package stores

import (
	"context"
	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewMongoClient(ctx context.Context, uri string) (*mongo.Client, error) {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, errors.Wrap(err, "failed to create mongo client")
	}

	return client, nil
}

func NewMongoDB(ctx context.Context, uri string, dbName string) (*mongo.Database, error) {
	client, err := NewMongoClient(ctx, uri)
	if err != nil {
		return nil, err
	}

	if err := client.Ping(ctx, nil); err != nil {
		return nil, errors.Wrap(err, "unable to ping mongodb")
	}

	return client.Database(dbName), nil
}