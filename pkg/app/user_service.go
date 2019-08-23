package app

import (
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/stores"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
)

type UserService struct {
	store        stores.UserStore
	loadoutstore stores.LoadoutStore
}

func NewUserService(r *mux.Router, store stores.UserStore, loadoutStore stores.LoadoutStore) *UserService {
	u := &UserService{
		store:        store,
		loadoutstore: loadoutStore,
	}

	r.HandleFunc("/users", u.createUser).Methods(http.MethodPost)
	r.HandleFunc("/users/{id}", u.getUser).Methods(http.MethodGet)
	r.HandleFunc("/users/{id}/loadouts", u.getUserLoadouts).Methods(http.MethodGet)
	r.HandleFunc("/users/{id}/feed", u.getFeedLoadouts).Methods(http.MethodGet)
	r.HandleFunc("/users/{id}", u.deleteUser).Methods(http.MethodDelete)
	r.HandleFunc("/users/{id}", u.updateUser).Methods(http.MethodPut)
	return u
}

func (u *UserService) getUser(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	user, err := u.store.Get(context.Background(), id)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) createUser(w http.ResponseWriter, r *http.Request) {
	// todo check if admin or is user
	// todo whitelist props
	user := new(stores.User)
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to decode user")
		return
	}

	if user.Id == "" {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	user, err := u.store.Create(r.Context(), user)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) deleteUser(w http.ResponseWriter, r *http.Request) {
	_, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	// todo check if admin
}

func (u *UserService) updateUser(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	// todo check if admin or is user
	// todo whitelist props
	props := bson.M{}
	if err := json.NewDecoder(r.Body).Decode(&props); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to decode user props "+id)
		return
	}

	user, err := u.store.Update(r.Context(), id, props)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) getUserLoadouts(w http.ResponseWriter, r *http.Request) {
	v := mux.Vars(r)
	id, ok := v["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	page := stores.FromRequest(r)
	log.Info("page ", page)
	ls, err := u.loadoutstore.GetByUser(context.Background(), id, page)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, ls)
}

func (u *UserService) getFeedLoadouts(w http.ResponseWriter, r *http.Request) {

}
