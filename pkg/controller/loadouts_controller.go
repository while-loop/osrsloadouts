package controller

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/store"
)

type LoadoutController struct {
	lStore  store.LoadoutStore
	usStore store.UserStatsStore
	vlStore store.ViewLogStore
}

func NewLoadoutController(lStore store.LoadoutStore, usStore store.UserStatsStore, vlStore store.ViewLogStore) *LoadoutController {
	return &LoadoutController{
		lStore:  lStore,
		usStore: usStore,
		vlStore: vlStore,
	}
}

func (c *LoadoutController) Create(ctx context.Context, l *store.Loadout) (*store.Loadout, *errors.ApiError) {
	return c.lStore.Create(ctx, l)
}

func (c *LoadoutController) CreateAll(ctx context.Context, ls []*store.Loadout) *errors.ApiError {
	return c.lStore.CreateAll(ctx, ls)
}

func (c *LoadoutController) Get(ctx context.Context, id, uid, ip string) (*store.Loadout, *errors.ApiError) {
	l, err := c.lStore.Get(ctx, uid)
	if err != nil {
		return nil, err
	}

	// todo update view count in view collections
	// todo add to view_log
	// check if user has favorited from favorite collection

	return l, nil
}

func (c *LoadoutController) Update(ctx context.Context, l *store.Loadout) (*store.Loadout, *errors.ApiError) {
	return c.lStore.Update(ctx, l)
}

func (c *LoadoutController) Delete(ctx context.Context, id string) *errors.ApiError {
	// todo: delete parent_id from all loadouts
	// todo: remove view/favorites from user_stats
	return c.lStore.Delete(ctx, id)
}

func (c *LoadoutController) Copy(ctx context.Context, id string, author store.Author) (*store.Loadout, *errors.ApiError) {
	l, err := c.lStore.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	l.Author = author
	l.Parent = id
	l.Copies = 0
	l.Favorites = 0
	l.Views = 0

	l, err = c.lStore.Create(ctx, l)
	if err != nil {
		return nil, err
	}

	return l, nil
}

func (c *LoadoutController) GetAll(ctx context.Context, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	return c.lStore.GetAll(ctx, p)
}

func (c *LoadoutController) GetByUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	return c.lStore.GetByUser(ctx, id, p)
}

func (c *LoadoutController) GetForUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	panic("implement me")
}
