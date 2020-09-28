package auth

import (
	"context"
	"firebase.google.com/go/auth"
	"fmt"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/log"
	"github.com/while-loop/osrsinvy/pkg/store"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"net/http"
)

type OsrsInvyClaims struct {
	Roles    []string
	UserID   string
	Username string
}

func (c OsrsInvyClaims) ToAuthor() store.Author {
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
	osrsInvyClaims, err := ClaimsFromRequest(r, c.client)
	if err != nil && !c.optional {
		utils.WriteApiError(w, err)
		return
	}

	log.Info("claims ", osrsInvyClaims)
	c.h.ServeHTTP(w, r.WithContext(WithClaims(r.Context(), osrsInvyClaims)))
}

func GetClaims(ctx context.Context) *OsrsInvyClaims {
	claimsInf := ctx.Value(keyval)
	if claimsInf == nil {
		return nil
	}
	return claimsInf.(*OsrsInvyClaims)
}

func WithClaims(ctx context.Context, claims *OsrsInvyClaims) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}

	return context.WithValue(ctx, keyval, claims)
}

func ClaimsFromRequest(r *http.Request, verifier Verifier) (*OsrsInvyClaims, *errors.ApiError) {
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

	osrsInvyClaims, err := ClaimsFromToken(token)
	if err != nil {
		return nil, errors.NewApi(http.StatusInternalServerError, err, "error parsing claims")
	}

	return osrsInvyClaims, nil
}

func ClaimsFromToken(token *auth.Token) (*OsrsInvyClaims, error) {
	if token.UID == "" {
		return nil, fmt.Errorf("no token uid")
	}

	username := ""
	if u, ok := token.Claims["username"]; ok {
		username = u.(string)
	}

	carmateClaims := &OsrsInvyClaims{
		UserID:   token.UID,
		Username: username,
	}

	return carmateClaims, nil
}

var keyval = struct{}{}
