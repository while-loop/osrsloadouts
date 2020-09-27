package app

import (
	"context"
	auth2 "firebase.google.com/go/auth"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/config"
	"github.com/while-loop/osrsinvy/pkg/controller"
	"github.com/while-loop/osrsinvy/pkg/store"
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

	ls := store.NewLoadoutStore(db)
	us := store.NewUserStore(db)
	uss := store.NewUserStatsStore(db)
	vl := store.NewViewLogStore(db)

	lc := controller.NewLoadoutController(ls, uss, vl)
	uc := controller.NewUserController(authCli, us, ls)
	NewLoadoutService(a.rootRouter, lc, verifier)
	NewUserService(a.rootRouter, uc, verifier)
	return a, nil
}
