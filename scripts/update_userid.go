package main

import (
	"context"
	"github.com/kelseyhightower/envconfig"
	osrsloadouts "github.com/while-loop/osrsloadouts/pkg"
	"github.com/while-loop/osrsloadouts/pkg/config"
	"github.com/while-loop/osrsloadouts/pkg/log"
	"github.com/while-loop/osrsloadouts/pkg/store"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	conf := new(config.Config)
	err := envconfig.Process(osrsloadouts.Name, conf)
	if err != nil {
		log.Fatal("failed to parse env: ", err.Error())
	}

	ctx := context.Background()

	db, err := store.NewMongoDB(ctx, conf.MongoAddr, conf.MongoDb)
	if err != nil {
		log.Fatal("failed to get db: ", err)
	}

	oldId := "Z9QKlCsDchMJOsKYjaBpVxDBEbQ2"
	newId := "CrEWyxRN0GYVePdnZejWlBRYzaJ3"
	find := bson.M{"author.id": oldId}

	update := bson.M{
		"$set": bson.M{
			"author.id": newId,
		},
	}

	coll := db.Collection("loadouts")
	_, err = coll.UpdateMany(ctx, find, update)
	if err != nil {
		log.Fatal(err)
	}
}
