package app

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/auth"
	"github.com/while-loop/osrsinvy/pkg/controller"
	"github.com/while-loop/osrsinvy/pkg/store"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"net/http"
)

type LoadoutService struct {
	lCtlr    *controller.LoadoutController
	verifier auth.Verifier
}

func NewLoadoutService(r *mux.Router, lCtlr *controller.LoadoutController, verifier auth.Verifier) *LoadoutService {
	l := &LoadoutService{
		lCtlr:    lCtlr,
		verifier: verifier,
	}

	r.HandleFunc("/loadouts", verifier.HandlerFunc(l.createLoadout)).Methods(http.MethodPost)
	r.HandleFunc("/loadouts/{id}", verifier.HandlerFuncOpt(l.getLoadout)).Methods(http.MethodGet)
	r.HandleFunc("/loadouts/{id}", verifier.HandlerFunc(l.updateLoadout)).Methods(http.MethodPut)
	r.HandleFunc("/loadouts/{id}", verifier.HandlerFunc(l.deleteLoadout)).Methods(http.MethodDelete)

	r.HandleFunc("/loadouts", verifier.HandlerFuncOpt(l.getLoadouts)).Methods(http.MethodGet)
	r.HandleFunc("/loadouts/{id}/copy", verifier.HandlerFunc(l.copyLoadout)).Methods(http.MethodPost)
	r.HandleFunc("/loadouts/{id}/favorite", verifier.HandlerFunc(l.favoriteLoadout)).Methods(http.MethodPost)
	r.HandleFunc("/loadouts/user/{id}", verifier.HandlerFuncOpt(l.getUserLoadouts)).Methods(http.MethodGet)
	return l
}

func (a *LoadoutService) createLoadout(w http.ResponseWriter, r *http.Request) {
	l := new(store.Loadout)
	if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to parse loadout")
		return
	}

	claims := auth.GetClaims(r.Context())
	if claims == nil {
		utils.WriteErrorStatus(w, http.StatusUnauthorized, "no claims found")
		return
	}

	l.Author = claims.ToAuthor()

	l, err := a.lCtlr.Create(r.Context(), l)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) getLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	ip := utils.ReadUserIP(r)
	uid := ""
	if claims, err := auth.ClaimsFromRequest(r, a.verifier); err == nil {
		uid = claims.UserID
	}

	l, err := a.lCtlr.Get(r.Context(), id, uid, ip)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) updateLoadout(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no loadout id")
		return
	}

	l := new(store.Loadout)
	if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to parse loadout")
		return
	}

	if id != l.Id {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "loadout IDs do not match")
		return
	}

	if apiErr := auth.HasAuthorization(r.Context(), l.Author.Id); apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	l, err := a.lCtlr.Update(r.Context(), l)
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

	l, err := a.lCtlr.Get(r.Context(), id, "", "")
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	if apiErr := auth.HasAuthorization(r.Context(), l.Author.Id); apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	if err := a.lCtlr.Delete(r.Context(), id); err != nil {
		utils.WriteApiError(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (a *LoadoutService) getLoadouts(w http.ResponseWriter, r *http.Request) {
	ls, err := a.lCtlr.GetAll(r.Context(), store.FromRequest(r))
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, ls)
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

	l, err := a.lCtlr.Copy(r.Context(), id, claims.ToAuthor())
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, l)
}

func (a *LoadoutService) getUserLoadouts(w http.ResponseWriter, r *http.Request) {
	v := mux.Vars(r)
	id, ok := v["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	page := store.FromRequest(r)
	ls, err := a.lCtlr.GetByUser(r.Context(), id, page)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, ls)
}

func (a *LoadoutService) favoriteLoadout(w http.ResponseWriter, r *http.Request) {
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

	var body map[string]bool
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to parse favorite")
		return
	}

	err := a.lCtlr.SetFavorite(r.Context(), id, claims.UserID, body["favorite"])
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
