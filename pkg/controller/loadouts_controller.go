package controller

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/store"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"strings"
	"time"
)

type userStatsProvider func(ustats *store.UserStats) (*store.LoadoutResponse, *errors.ApiError)

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
	lr, err := c.wrapStats(ctx, func(stats *store.UserStats) (*store.LoadoutResponse, *errors.ApiError) {
		l, err := c.lStore.Get(ctx, id)
		if err != nil {
			return nil, err
		}
		return &store.LoadoutResponse{
			Loadouts: []*store.Loadout{l},
		}, nil
	})

	if err != nil {
		return nil, err
	}

	if len(lr.Loadouts) <= 0 {
		return nil, errors.NewApif(http.StatusInternalServerError, errors.New("failed to get wrapped fav loadout"), "Unable to get loadout")
	}
	l := lr.Loadouts[0]

	go c.updateViewCount(context.Background(), l, uid, ip)
	return l, nil
}

func (c *LoadoutController) Update(ctx context.Context, l *store.Loadout) (*store.Loadout, *errors.ApiError) {
	lr, err := c.wrapStats(ctx, func(ustats *store.UserStats) (*store.LoadoutResponse, *errors.ApiError) {
		l, err := c.lStore.Update(ctx, l)
		if err != nil {
			return nil, err
		}

		return &store.LoadoutResponse{
			Loadouts: []*store.Loadout{l},
		}, nil
	})
	if err != nil {
		return nil, err
	}

	if len(lr.Loadouts) <= 0 {
		return nil, errors.NewApif(http.StatusInternalServerError, errors.New("failed to get wrapped fav loadout update"), "Unable to get loadout")
	}
	l = lr.Loadouts[0]

	return l, nil
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
	ogId := l.Id

	l.Author = author
	l.Parent = id
	l.Title += " (copy)"
	l.Reset()

	l, err = c.lStore.Create(ctx, l)
	if err != nil {
		return nil, err
	}

	go func() {
		if err := c.lStore.IncrementCounter(context.Background(), ogId, store.CopiesKey, 1); err != nil {
			log.Warnf("failed to inc copy %s: %v", ogId, err)
		}
	}()

	return l, nil
}

func (c *LoadoutController) GetAll(ctx context.Context, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	return c.wrapStats(ctx, func(ustats *store.UserStats) (*store.LoadoutResponse, *errors.ApiError) {
		c.setFilters(p, ustats)
		return c.lStore.GetAll(ctx, p)
	})
}

func (c *LoadoutController) GetByUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	return c.wrapStats(ctx, func(ustats *store.UserStats) (*store.LoadoutResponse, *errors.ApiError) {
		c.setFilters(p, ustats)
		return c.lStore.GetByUser(ctx, id, p)
	})
}

func (c *LoadoutController) wrapStats(ctx context.Context, fn userStatsProvider) (*store.LoadoutResponse, *errors.ApiError) {
	ustats := c.fetchStats(ctx)

	ls, err := fn(ustats)
	if err != nil {
		return nil, err
	}

	if ustats != nil {
		for _, loadout := range ls.Loadouts {
			if _, ok := ustats.Favorites[loadout.Id]; ok {
				loadout.Favorited = true
			}
		}
	}

	return ls, nil
}

func (c *LoadoutController) GetForUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	panic("implement me")
}

func (c *LoadoutController) fetchStats(ctx context.Context) *store.UserStats {
	claims := auth.GetClaims(ctx)
	if claims == nil {
		return nil
	}

	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()
	ustats, err := c.usStore.Get(ctx, claims.UserID)
	if err != nil {
		return nil
	}

	return ustats
}

func (c *LoadoutController) updateViewCount(ctx context.Context, l *store.Loadout, uid string, ip string) {
	if ip == "" && uid == "" {
		return
	}

	viewId := ip
	if uid != "" {
		viewId = uid
		if err := c.usStore.SetViewed(ctx, uid, l.Id); err != nil {
			log.Warn(err)
		}
	}

	ok, err := c.vlStore.CanIncView(ctx, viewId, l.Id)
	if err != nil {
		log.Warn(err)
	}

	if ok {
		if err := c.lStore.IncrementCounter(ctx, l.Id, store.ViewsKey, 1); err != nil {
			log.Warn(err)
		}
	}
}

func (c *LoadoutController) SetFavorite(ctx context.Context, loadoutId, uid string, fav bool) *errors.ApiError {
	// make sure this loadout exists
	_, err := c.lStore.Get(ctx, loadoutId)
	if err != nil {
		return err
	}

	ok, err := c.usStore.SetFavorite(ctx, uid, loadoutId, fav)
	if err != nil {
		return err
	}

	delta := 1
	if !fav {
		delta = -1
	}
	if ok {
		if err := c.lStore.IncrementCounter(ctx, loadoutId, store.FavoritesKey, delta); err != nil {
			log.Warnf("failed to inc fav loadout counter %s %s %t: %v", loadoutId, uid, fav, err)
		}
	}

	return nil
}

func (c *LoadoutController) setFilters(p *store.Pagination, ustats *store.UserStats) {
	if ustats == nil {
		return
	}

	boolFilter := func(key string, ids []string) {
		boolStr := strings.ToLower(p.Params.Get(key))
		if boolStr == "" {
			return
		}

		op := "$in"
		if boolStr == "false" {
			op = "$nin"
		}

		if _, ok := p.Filters["$and"]; !ok {
			p.Filters["$and"] = []bson.M{}
		}

		p.Filters["$and"] = append(p.Filters["$and"].([]bson.M), bson.M{
			"_id": bson.M{
				op: ids,
			},
		})
	}

	getIds := func(stats map[string]store.Stats) []string {
		ids := make([]string, len(stats))
		i := 0
		for k := range stats {
			ids[i] = k
			i++
		}

		return ids
	}

	boolFilter("favorited", getIds(ustats.Favorites))
	boolFilter("viewed", getIds(ustats.Views))
}
