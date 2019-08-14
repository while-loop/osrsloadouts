package app

import (
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/stores"
	"net/http"
)

type LoadoutService struct {
	store stores.LoadoutStore
}

func NewLoadoutService(r *mux.Router, store stores.LoadoutStore) *LoadoutService {
	l := &LoadoutService{
		store: store,
	}

	r.HandleFunc("/loadouts/:id", l.getLoadout).Methods(http.MethodGet)
	r.HandleFunc("/loadouts/:id", l.deleteLoadout).Methods(http.MethodDelete)
	r.HandleFunc("/loadouts/:id", l.updateLoadout).Methods(http.MethodPut)
	r.HandleFunc("/loadouts/:id/copy", l.copyLoadout).Methods(http.MethodPost)
	r.HandleFunc("/loadouts", l.getLoadouts).Methods(http.MethodPost)
	return l
}

func (a *LoadoutService) getLoadouts(w http.ResponseWriter, r *http.Request) {

}

func (a *LoadoutService) getLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		writeErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	a.store

}
