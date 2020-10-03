package controller

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/store"
	"net/http"
	"time"
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
	lr, err := c.wrapFavs(ctx, func() (*store.LoadoutResponse, *errors.ApiError) {
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
	lr, err := c.wrapFavs(ctx, func() (*store.LoadoutResponse, *errors.ApiError) {
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
	return c.wrapFavs(ctx, func() (*store.LoadoutResponse, *errors.ApiError) {
		return c.lStore.GetAll(ctx, p)
	})
}

func (c *LoadoutController) GetByUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	return c.wrapFavs(ctx, func() (*store.LoadoutResponse, *errors.ApiError) {
		return c.lStore.GetByUser(ctx, id, p)
	})
}

func (c *LoadoutController) wrapFavs(ctx context.Context, fn func() (*store.LoadoutResponse, *errors.ApiError)) (*store.LoadoutResponse, *errors.ApiError) {
	favsChan := c.fetchFavs(ctx)

	ls, err := fn()
	if err != nil {
		return nil, err
	}

	if favsChan != nil {
		c.setFavs(ctx, favsChan, ls.Loadouts)
	}
	return ls, nil
}

func (c *LoadoutController) GetForUser(ctx context.Context, id string, p *store.Pagination) (*store.LoadoutResponse, *errors.ApiError) {
	panic("implement me")
}

func (c *LoadoutController) fetchFavs(ctx context.Context) chan map[string]store.Stats {
	claims := auth.GetClaims(ctx)
	if claims == nil {
		return nil
	}

	favsChan := make(chan map[string]store.Stats)
	go func() {
		favs, err := c.usStore.GetFavorites(ctx, claims.UserID)
		if err != nil {
			log.Error(errors.Wrapf(err, "failed to get user favs %s", claims.UserID))
			favsChan <- nil
		} else {
			log.Info("got favs")
			favsChan <- favs
		}
		close(favsChan)
	}()

	return favsChan
}

func (c *LoadoutController) setFavs(ctx context.Context, favsChan chan map[string]store.Stats, ls []*store.Loadout) {
	if favsChan == nil {
		return
	}

	select {
	case favs, ok := <-favsChan:
		if ok && len(favs) > 0 {
			for _, loadout := range ls {
				if _, ok := favs[loadout.Id]; ok {
					loadout.Favorited = true
				}
			}
		}
	case <-time.After(1000 * time.Millisecond):
	case <-ctx.Done():
		log.Error(errors.Wrap(ctx.Err(), "deadline waiting for favs"))
	}
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

