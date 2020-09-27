package store

import (
	"github.com/while-loop/osrsinvy/pkg/log"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

type Pagination struct {
	Page   uint32
	Limit  uint32
	Sort   string
	Search string
}

func FromRequest(r *http.Request) *Pagination {
	vars := r.URL.Query()

	page := asUInt32("page", vars, 0)
	limit := asUInt32("limit", vars, 15)
	sort := vars.Get("sort")
	search := vars.Get("search")

	return &Pagination{
		Page:   page,
		Limit:  limit,
		Sort:   sort,
		Search: search,
	}
}

func (p Pagination) GetSort() bson.D {
	if p.Sort == "" {
		p.Sort = "-created"
	}

	order := 1
	if strings.HasPrefix(p.Sort, "-") {
		order = -1
	}

	return bson.D{{Key: strings.TrimPrefix(p.Sort, "-"), Value: order}}
}

func (p Pagination) AddSearch(filter bson.M) bson.M {
	if filter == nil {
		filter = bson.M{}
	}

	if p.Search == "" {
		return filter
	}

	filter["$text"] = bson.M{"$search": p.Search}
	return filter
}

func asUInt32(key string, vars url.Values, def uint32) uint32 {
	v := vars.Get(key)
	if v == "" {
		return def
	}

	n, err := strconv.ParseUint(v, 10, 32)
	if err != nil {
		log.Errorf("failed to parse pagination number %s: %v", v, err)
		return def
	}

	return uint32(n)
}
