package main

import (
	"context"
	"github.com/kelseyhightower/envconfig"
	osrsinvy "github.com/while-loop/osrsinvy/pkg"
	"github.com/while-loop/osrsinvy/pkg/config"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/stores"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	conf := new(config.Config)
	err := envconfig.Process(osrsinvy.Name, conf)
	if err != nil {
		log.Fatal("failed to parse env: ", err.Error())
	}

	ctx := context.Background()

	db, err := stores.NewMongoDB(ctx, conf.MongoAddr, conf.MongoDb)
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


