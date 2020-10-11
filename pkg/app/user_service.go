package app

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/while-loop/osrsloadouts/pkg/auth"
	"github.com/while-loop/osrsloadouts/pkg/controller"
	"github.com/while-loop/osrsloadouts/pkg/store"
	"github.com/while-loop/osrsloadouts/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
)

type UserService struct {
	uCtlr *controller.UserController
}

func NewUserService(r *mux.Router, uCtlr *controller.UserController, verifier auth.Verifier) *UserService {
	u := &UserService{
		uCtlr: uCtlr,
	}

	r.HandleFunc("/users", verifier.HandlerFunc(u.createUser)).Methods(http.MethodPost)
	r.HandleFunc("/users/{id}", verifier.HandlerFuncOpt(u.getUser)).Methods(http.MethodGet)
	r.HandleFunc("/users/username/{username}", verifier.HandlerFuncOpt(u.getByUsername)).Methods(http.MethodGet)
	r.HandleFunc("/users/{id}", verifier.HandlerFunc(u.deleteUser)).Methods(http.MethodDelete)
	r.HandleFunc("/users/{id}", verifier.HandlerFunc(u.updateUser)).Methods(http.MethodPut)
	return u
}

func (u *UserService) getByUsername(w http.ResponseWriter, r *http.Request) {
	username, ok := mux.Vars(r)["username"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no username")
		return
	}

	user, err := u.uCtlr.GetByUsername(r.Context(), username)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) getUser(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	user, err := u.uCtlr.Get(r.Context(), id)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) createUser(w http.ResponseWriter, r *http.Request) {
	user := new(store.User)
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to decode user")
		return
	}

	if user.Id == "" {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	// createUser should already have a UUID given by firebase. make sure
	// the given ID matches firebase claims.
	if apiErr := auth.HasAuthorization(r.Context(), user.Id); apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	user, err := u.uCtlr.Create(r.Context(), user)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}

func (u *UserService) deleteUser(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	apiErr := auth.HasAuthorization(r.Context(), id)
	if apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	apiErr = u.uCtlr.Delete(r.Context(), id)
	if apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (u *UserService) updateUser(w http.ResponseWriter, r *http.Request) {
	id, ok := mux.Vars(r)["id"]
	if !ok {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "no user id")
		return
	}

	if apiErr := auth.HasAuthorization(r.Context(), id); apiErr != nil {
		utils.WriteApiError(w, apiErr)
		return
	}

	props := bson.M{}
	if err := json.NewDecoder(r.Body).Decode(&props); err != nil {
		utils.WriteErrorStatus(w, http.StatusBadRequest, "unable to decode user props "+id)
		return
	}

	user, err := u.uCtlr.Update(r.Context(), id, props)
	if err != nil {
		utils.WriteApiError(w, err)
		return
	}

	utils.WriteJson(w, user)
}
