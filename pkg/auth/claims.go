package auth

import (
	"context"
	"firebase.google.com/go/auth"
	"fmt"
	"github.com/while-loop/osrsloadouts/pkg/errors"
	"github.com/while-loop/osrsloadouts/pkg/log"
	"github.com/while-loop/osrsloadouts/pkg/store"
	"github.com/while-loop/osrsloadouts/pkg/utils"
	"net/http"
)

type OsrsLoadoutsClaims struct {
	Roles    []string
	UserID   string
	Username string
}

func (c OsrsLoadoutsClaims) ToAuthor() store.Author {
	return store.Author{
		Id:       c.UserID,
		Username: c.Username,
	}
}

type ClaimsHandler struct {
	h        http.Handler
	client   Verifier
	optional bool
}

func NewClaimsHandler(h http.Handler, client Verifier) http.Handler {
	return &ClaimsHandler{h: h, client: client}
}

func NewClaims(h http.HandlerFunc, client Verifier) http.HandlerFunc {
	c := &ClaimsHandler{h: h, client: client}
	return func(w http.ResponseWriter, r *http.Request) {
		c.ServeHTTP(w, r)
	}
}

func (c *ClaimsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	osrsLoadoutsClaims, err := ClaimsFromRequest(r, c.client)
	if err != nil && !c.optional {
		utils.WriteApiError(w, err)
		return
	}

	log.Info("claims ", osrsLoadoutsClaims)
	c.h.ServeHTTP(w, r.WithContext(WithClaims(r.Context(), osrsLoadoutsClaims)))
}

func GetClaims(ctx context.Context) *OsrsLoadoutsClaims {
	claimsInf := ctx.Value(keyval)
	if claimsInf == nil {
		return nil
	}
	return claimsInf.(*OsrsLoadoutsClaims)
}

func WithClaims(ctx context.Context, claims *OsrsLoadoutsClaims) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}

	return context.WithValue(ctx, keyval, claims)
}

func ClaimsFromRequest(r *http.Request, verifier Verifier) (*OsrsLoadoutsClaims, *errors.ApiError) {
	headers := r.Header
	idToken := headers.Get("Authorization")
	if idToken == "" {
		return nil, errors.NewApi(http.StatusUnauthorized, nil, "claims: no token")
	}

	ctx := r.Context()
	token, err := verifier.Verify(ctx, idToken)
	if err != nil {
		return nil, errors.NewApi(http.StatusForbidden, err, "error verifying ID token")
	}

	osrsLoadoutsClaims, err := ClaimsFromToken(token)
	if err != nil {
		return nil, errors.NewApi(http.StatusInternalServerError, err, "error parsing claims")
	}

	return osrsLoadoutsClaims, nil
}

func ClaimsFromToken(token *auth.Token) (*OsrsLoadoutsClaims, error) {
	if token.UID == "" {
		return nil, fmt.Errorf("no token uid")
	}

	username := ""
	if u, ok := token.Claims["username"]; ok {
		username = u.(string)
	}

	carmateClaims := &OsrsLoadoutsClaims{
		UserID:   token.UID,
		Username: username,
	}

	return carmateClaims, nil
}

var keyval = struct{}{}
