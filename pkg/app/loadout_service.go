package app

import (
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/stores"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"net/http"
)

type LoadoutService struct {
	store    stores.LoadoutStore
	verifier auth.Verifier
}

func NewLoadoutService(r *mux.Router, store stores.LoadoutStore, verifier auth.Verifier) *LoadoutService {
	l := &LoadoutService{
		store:    store,
		verifier: verifier,
	}

	r.HandleFunc("/loadouts/{id}", verifier.HandlerFunc(l.deleteLoadout)).Methods(http.MethodDelete)
	r.HandleFunc("/loadouts/{id}", verifier.HandlerFunc(l.updateLoadout)).Methods(http.MethodPut)
	r.HandleFunc("/loadouts/{id}/copy", verifier.HandlerFunc(l.copyLoadout)).Methods(http.MethodPut)
	r.HandleFunc("/loadouts", verifier.HandlerFunc(l.createLoadout)).Methods(http.MethodPost)
	r.HandleFunc("/loadouts", l.getLoadouts).Methods(http.MethodGet)
	r.HandleFunc("/loadouts/{id}", l.getLoadout).Methods(http.MethodGet)
	return l
}

func (a *LoadoutService) getLoadouts(w http.ResponseWriter, r *http.Request) {
	ls, err := a.store.GetAll(context.Background(), stores.FromRequest(r))
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, ls)
}

func (a *LoadoutService) getLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	ip := utils.ReadUserIP(r)
	uid := ""
	claims, err := auth.ClaimsFromRequest(r, a.verifier)
	if err == nil {
		uid = claims.UserID
	}

	l, err := a.store.Get(context.Background(), uid, ip, id)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) deleteLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	if err := a.store.Delete(context.Background(), id); err != nil {
		utils.WriteApiError(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (a *LoadoutService) createLoadout(w http.ResponseWriter, r *http.Request) {
	l := new(stores.Loadout)
	if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to parse loadout")
		return
	}

	claims := auth.GetClaims(r.Context())
	if claims == nil {
		utils.WriteErrorStatus(w, http.StatusUnauthorized, "no claims found")
		return
	}
	l.Author = stores.Author{
		Id:       claims.UserID,
		Username: claims.Username,
	}

	l, err := a.store.Create(context.Background(), l)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) updateLoadout(w http.ResponseWriter, r *http.Request) {
	// todo make sure current user == author
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	l := new(stores.Loadout)
	if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to parse loadout")
		return
	}

	claims := auth.GetClaims(r.Context())
	if claims == nil || claims.UserID == "" || claims.UserID != l.Author.Id {
		utils.WriteErrorStatus(w, http.StatusForbidden, "permission denied")
		return
	}

	l.Id = id
	l, err := a.store.Update(context.Background(), l)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) copyLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	claims := auth.GetClaims(r.Context())
	if claims == nil {
		utils.WriteErrorStatus(w, http.StatusUnauthorized, "no claims found")
		return
	}

	l, err := a.store.Copy(context.Background(), id, stores.Author{
		Id:       claims.UserID,
		Username: claims.Username,
	})
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}
