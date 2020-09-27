package store

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/log"
	"go.mongodb.org/mongo-driver/bson"
	"math"
	"math/rand"
	"strings"
	"testing"
	"time"
)

var (
	words = []string{
		"barrows", "gwd", "vorkath", "pking", "slayer",
		"bloodveld", "duo", "cox", "raidas", "farming", "fletching", "jad", "dks",
		"brutal black dragons", "kraken", "dust", "devil", "nech", "gorillas",
	}
	tagsCount = 3
)

func randomWords(count int) []string {
	randomWords := make([]string, count)
	for i := 0; i < count; i++ {
		randomWords[i] = words[rand.Intn(len(words)-1)]
	}

	return randomWords
}

func seedLoadouts(count int, b *testing.B) {
	rand.Seed(time.Now().Unix())
	ctx := context.Background()

	db := getDb(b)
	_, err := db.Collection("loadouts").DeleteMany(ctx, bson.M{})
	if err != nil {
		b.Fatalf("failed to drop loadouts collection: %v", err)
	}

	loadoutStore := getLoadoutsStore(b)
	userStore := getUserStoreB(b)
	whileloop, apiErr := userStore.GetByUsername(ctx, "while-loop")
	if apiErr != nil {
		log.Fatal(apiErr)
	}

	start := time.Now().UTC()
	loaded := 0
	loadouts := make([]*Loadout, int(math.Min(500000, float64(count))))

	for loaded < count {
		for i := 0; i < len(loadouts); i++ {
			loadouts[i] = &Loadout{
				Title: randomWords(1)[0],
				Author: Author{
					Id:       whileloop.Id,
					Username: whileloop.Username,
				},
				Tags: randomWords(tagsCount),
			}
		}

		apiErr = loadoutStore.CreateAll(ctx, loadouts)
		if apiErr != nil {
			b.Errorf("failed to create loadout: %v", err)
		}
		loaded += len(loadouts)
	}

	b.Logf("created %d loadouts in %v", count, time.Now().Sub(start))
}

func benchmarkQueryByUsername(count int, b *testing.B) {
	seedLoadouts(count, b)
	ctx := context.Background()
	l := getLoadoutsStore(b)
	u, err := getUserStoreB(b).GetByUsername(ctx, "while-loop")
	if err != nil {
		b.Fatal(err)
	}

	p := &Pagination{
		Page:   1,
		Limit:  50,
		Search: strings.Join(randomWords(3), " "),
	}
	b.ResetTimer()
	lLen := 0
	lTotal := 0

	for i := 0; i < b.N; i++ {
		lr, err := l.GetByUser(ctx, u.Id, p)
		if err != nil {
			b.Errorf("failed to get loadouts %v: %v", b.Name(), err)
		}
		lLen += len(lr.Loadouts)
		lTotal += int(lr.Total)
	}

	b.Logf("b.N: %d --- len: %d  --- total: %d", b.N, lLen, lTotal)
}

func BenchmarkQueryByUsername100k(b *testing.B) {
	benchmarkQueryByUsername(100000, b)
}

func BenchmarkQueryByUsername500k(b *testing.B) {
	benchmarkQueryByUsername(500000, b)
}

func BenchmarkQueryByUsername1000k(b *testing.B) {
	benchmarkQueryByUsername(1000000, b)
}

func BenchmarkQueryByUsername2500k(b *testing.B) {
	benchmarkQueryByUsername(2500000, b)
}
