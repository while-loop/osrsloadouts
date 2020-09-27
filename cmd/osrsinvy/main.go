package main

import (
	"context"
	"flag"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
	"github.com/while-loop/osrsinvy/pkg"
	"github.com/while-loop/osrsinvy/pkg/app"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/config"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/store"
	"net/http"
	"os"
)

var (
	v = flag.Bool("v", false, osrsinvy.Name+" version")
)

func main() {
	log.Infof("%s %s %s %s", osrsinvy.Name, osrsinvy.Version, osrsinvy.BuildTime, osrsinvy.Commit)
	flag.Parse()
	if *v {
		return
	}

	conf := new(config.Config)
	err := envconfig.Process(osrsinvy.Name, conf)
	if err != nil {
		log.Fatal("failed to parse env: ", err.Error())
	}

	ctx := context.Background()

	db, err := store.NewMongoDB(ctx, conf.MongoAddr, conf.MongoDb)
	if err != nil {
		log.Fatal("failed to get db: ", err)
	}

	authCli, err := auth.NewAuthClient(ctx, conf.Creds)
	if err != nil {
		log.Fatalf("unable to get auth client: %v", err)
	}
	router := mux.NewRouter()
	_, err = app.New(router, db, authCli, conf)
	if err != nil {
		log.Fatal("failed to init app ", err)
	}

	log.Info("listening on port", conf.Port)
	log.Info(http.ListenAndServe(fmt.Sprintf(":%d", conf.Port), wrapAppHandler(router)))
}

func wrapAppHandler(h http.Handler) http.Handler {
	h = handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(h)
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Accept", "Accept-Language", "Content-Language", "Origin", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	h = handlers.CORS(
		headersOk,
		originsOk,
		methodsOk)(h)

	h = handlers.LoggingHandler(os.Stdout, h)
	//h = &as{h:h}

	return h
}
