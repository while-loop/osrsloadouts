package store

import (
	"context"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestSearchByUsername(t *testing.T) {
	emptyColl(loadoutColl, t)
	lStore := getLoadoutsStore(t)
	author := randomAuthor(t)
	ctx := context.Background()
	r := require.New(t)

	armaLoadout, err := lStore.Create(ctx, &Loadout{
		Title:  "This is my GWD title",
		Author: author,
		Tags:   []string{"gwd", "ARMA", "trio"},
	})
	r.Nil(err)
	_, err = lStore.Create(ctx, &Loadout{
		Title:  "This is my Barrows title",
		Author: author,
		Tags:   []string{"barrows", "brothers", "guthans"},
	})
	r.Nil(err)
	_, err = lStore.Create(ctx, &Loadout{
		Title:  "This is my Pking title",
		Author: author,
		Tags:   []string{"pking", "wildy", "skull"},
	})
	r.Nil(err)

	resp, err := lStore.GetByUser(ctx, author.Id, &Pagination{
		Page:   0,
		Limit:  10,
		Search: "arma",
	})

	r.Nil(err)
	r.Len(resp.Loadouts, 1)
	r.Equal(uint32(1), resp.Total)
	actual := resp.Loadouts[0]
	actual.Created = armaLoadout.Created
	actual.Updated = armaLoadout.Updated
	r.Equal(armaLoadout, actual)

	resp, err = lStore.GetByUser(ctx, author.Id, &Pagination{
		Page:   0,
		Limit:  10,
		Search: "arma wildy",
	})
	r.Nil(err)
	r.Len(resp.Loadouts, 2)
}
