package stores

import (
	"context"
	"time"
)


type Favorite struct {
	id string
	userId string
	contentId string
	created *time.Time
}

type FavoriteStore interface {
	Get(ctx context.Context, uuid string) (*Favorite, error)
	Delete(ctx context.Context, uuid string) error
	GetAll(ctx context.Context, limit, offset int64) ([]*Loadout, error)
	GetForUser(ctx context.Context, id string) ([]*Favorite, error)
}
