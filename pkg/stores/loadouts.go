package stores

import (
	"context"
	"time"
)

type ItemQuantity map[string]int32

type Loadout struct {
	id string
	title string
	author string
	description string
	created *time.Time
	updated *time.Time
	copies uint32
	favorites uint32
	favorited bool
	views uint32
	tags []string
	parent string
	inventory [4][7]ItemQuantity
	equipment map[string]ItemQuantity
}

type LoadoutStore interface {
	Get(ctx context.Context, uuid string) (*Loadout, error)
	Delete(ctx context.Context, uuid string) (*Loadout, error)
	Copy(ctx context.Context, uuid, author string) (*Loadout, error)
	GetAll(ctx context.Context, limit, offset int64) ([]*Loadout, error)
	Search(ctx context.Context) ([]*Loadout, error)
}
