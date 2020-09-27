package store

import (
	"context"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"os"
	"testing"
)

func getDb(b testing.TB) *mongo.Database {
	mongoAddr := os.Getenv("OSRSLOADOUTS_MONGO_ADDR")
	mongoDb := os.Getenv("OSRSLOADOUTS_MONGO_DB")
	if mongoAddr == "" {
		mongoAddr = "mongodb://localhost:27017/osrsinvy"
	}
	if mongoDb == "" {
		mongoDb = "osrsinvy"
	}

	ctx := context.Background()
	db, err := NewMongoDB(ctx, mongoAddr, mongoDb)
	if err != nil {
		b.Fatal("failed to get db: ", err)
	}

	return db
}

func getLoadoutsStore(b testing.TB) LoadoutStore {
	return NewLoadoutStore(getDb(b))
}

func getUserStoreB(b testing.TB) UserStore {
	return NewUserStore(getDb(b))
}

func emptyColl(collName string, t testing.TB) {
	_, err := getDb(t).Collection(collName).DeleteMany(context.Background(), bson.M{})
	if err != nil {
		t.Fatalf("failed to empty coll %s: %v", collName, err)
	}
}

func randomAuthor(t testing.TB) Author {
	uStore := getUserStoreB(t)
	id := uuid.New().String()
	u, err := uStore.Create(context.Background(), &User{
		Id:       id,
		Username: id,
	})
	if err != nil {
		t.Fatalf("failed to create random user: %v", err)
	}

	return u.ToAuthor()
}
