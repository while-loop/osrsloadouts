package app

import (
	"context"
	auth2 "firebase.google.com/go/auth"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/config"
	"github.com/while-loop/osrsinvy/pkg/stores"
	"go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	rootRouter *mux.Router
	closeChan  chan struct{}
	doneChan   chan struct{}
}

func New(handler *mux.Router, db *mongo.Database, authCli *auth2.Client, config *config.Config) (*App, error) {
	a := &App{
		rootRouter: handler,
		closeChan:  make(chan struct{}),
		doneChan:   make(chan struct{}),
	}

	verifier, err := auth.NewAuthVerifier(context.Background(), authCli)
	if err != nil {
		return nil, err
	}

	ls := stores.NewLoadoutStore(db)
	us := stores.NewUserStore(db, authCli)

	NewLoadoutService(a.rootRouter, ls, verifier)
	NewUserService(a.rootRouter, us, ls)
	return a, nil
}
