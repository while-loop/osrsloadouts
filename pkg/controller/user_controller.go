package controller

import (
	"context"
	"firebase.google.com/go/auth"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/store"
	"go.mongodb.org/mongo-driver/bson"
)

type UserController struct {
	userStore store.UserStore
	fauth     *auth.Client
	lStore    store.LoadoutStore
}

func NewUserController(auth *auth.Client, uStore store.UserStore, lStore store.LoadoutStore) *UserController {
	return &UserController{
		fauth:     auth,
		userStore: uStore,
		lStore:    lStore,
	}
}

func (c *UserController) Create(ctx context.Context, u *store.User) (*store.User, *errors.ApiError) {
	if u.Username == "" {
		u.Username = store.GetRandomName(0)
	}

	u, err := c.userStore.Create(ctx, u)
	if err != nil {
		return nil, err
	}

	if err := c.setUsername(ctx, u.Id, u.Username); err != nil {
		log.Error(err)
	}

	return u, nil
}

func (c *UserController) Get(ctx context.Context, id string) (*store.User, *errors.ApiError) {
	return c.userStore.Get(ctx, id)
}

func (c *UserController) GetByUsername(ctx context.Context, username string) (*store.User, *errors.ApiError) {
	return c.userStore.GetByUsername(ctx, username)
}

func (c *UserController) Delete(ctx context.Context, id string) *errors.ApiError {
	return c.userStore.Delete(ctx, id)
}

func (c *UserController) Update(ctx context.Context, id string, props bson.M) (*store.User, *errors.ApiError) {
	u, err := c.userStore.Update(ctx, id, props)
	if err != nil {
		return nil, err
	}

	if username, ok := props["username"]; ok {
		// todo gracefully unset new username. race condition
		if err := c.setUsername(ctx, id, username.(string)); err != nil {
			log.Error(err)
		} else {
			if err := c.lStore.MigrateUsername(ctx, id, username.(string)); err != nil {
				return nil, err
			}
		}
	}

	return u, nil
}

func (c *UserController) setUsername(ctx context.Context, id, username string) error {
	u, err := c.fauth.GetUser(ctx, id)
	if err != nil {
		return errors.Wrapf(err, "failed to update username for %s %s", id, username)
	}

	if u.CustomClaims == nil {
		u.CustomClaims = map[string]interface{}{
			"roles":    []string{},
			"username": "",
			"email":    u.Email,
		}
	}

	u.CustomClaims["username"] = username
	if err := c.fauth.SetCustomUserClaims(ctx, id, u.CustomClaims); err != nil {
		return errors.Wrapf(err, "failed to set claims for %s %s", id, username)
	}

	return nil
}
