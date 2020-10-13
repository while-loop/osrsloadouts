package app

import (
	"context"
	auth2 "firebase.google.com/go/auth"
	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsloadouts/pkg/auth"
	"github.com/while-loop/osrsloadouts/pkg/config"
	"github.com/while-loop/osrsloadouts/pkg/controller"
	"github.com/while-loop/osrsloadouts/pkg/store"
	proxge "github.com/while-loop/proxge/pkg"
	"github.com/while-loop/proxge/pkg/cache"
	"github.com/while-loop/proxge/pkg/ge"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
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

	geRouter := a.rootRouter.PathPrefix("/ge").Subrouter()
	rCache := cache.NewRedisCache(&redis.Options{
		Addr:         config.RedisAddr,
		Password:     config.RedisPass,
		DB:           config.RedisDB,
		MaxRetries:   1,
		MinIdleConns: 1,
		PoolSize:     3,
		MaxConnAge:   1 * time.Minute,
	}, config.RedisTTL)
	proxge.New(rCache, geRouter, ge.NewOsrsGe())
	return a, nil
}
