package stores

import (
	"context"
	"time"
)

type User struct {
	id       string
	username string
	rsn      string
	created  *time.Time
	updated  *time.Time
}

type UserStore interface {
	Get(ctx context.Context, uuid string) (*User, error)
	Delete(ctx context.Context, uuid string) error
	Update(ctx context.Context, user *User) (*User, error)
}
