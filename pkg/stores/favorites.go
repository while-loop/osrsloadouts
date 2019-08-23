package stores

import (
	"context"
	"time"
)


type Favorite struct {
	Id string
	UserId string
	ContentId string
	Created time.Time
}

type FavoriteStore interface {
	Get(ctx context.Context, uuid string) (*Favorite, error)
	Delete(ctx context.Context, uuid string) error
	GetAll(ctx context.Context) ([]*Loadout, error)
	GetForUser(ctx context.Context, id string) ([]*Favorite, error)
}
