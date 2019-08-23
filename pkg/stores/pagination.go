package stores

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
	Filter string
}

func FromRequest(r *http.Request) *Pagination {
	vars := r.URL.Query()

	page := asUInt32("page", vars, 0)
	limit := asUInt32("limit", vars, 15)
	sort := vars.Get("sort")

	return &Pagination{
		Page:   page,
		Limit:  limit,
		Sort:   sort,
		Filter: "",
	}
}

func (p Pagination) GetSort() bson.D {
	if p.Sort == "" {
		return nil
	}

	order := 1
	if strings.HasPrefix(p.Sort, "-") {
		order = -1
	}

	return bson.D{{strings.TrimPrefix(p.Sort, "-"), order}}
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
