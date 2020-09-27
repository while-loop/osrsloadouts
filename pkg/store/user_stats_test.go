package store

import (
	"context"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMongoUserStats_SetFavorite(t *testing.T) {
	ctx := context.Background()
	r := require.New(t)

	l := &Loadout{
		Title: "tjos ttikle",
		Author: randomAuthor(t),
	}
	ls := getLoadoutsStore(t)
	us := getUserStats(t)

	l, apiErr := ls.Create(ctx, l)
	r.Nil(apiErr)
	r.NotNil(l)

	ok, apiErr := us.SetFavorite(ctx, l.Author.Id, l.Id, true)
	r.Nil(apiErr)
	r.True(ok)

	favs, err := us.GetFavorites(ctx, l.Author.Id)
	r.Nil(err)

	r.Contains(favs, l.Id)
}
