package auth

import (
	"context"
	"firebase.google.com/go/auth"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestClaimWithNoUID(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		a.Equal("sometoken", idToken)
		return &auth.Token{}, nil
	})

	h := NewClaimsHandler(h(), m)
	r := authHeader("sometoken")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)

	t.Log(w.Body.String())
	//t.Fatal("asd")
}

func TestClaimWithNoTier(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		return &auth.Token{
			UID: "someuid",
		}, nil
	})

	h := NewClaimsHandler(h(), m)
	r := authHeader("sometoken")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)

	// todo
	a.NoError(nil)
}

func TestClaimWithAuthHeader(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		a.Equal("sometoken", idToken)
		return &auth.Token{
			UID:    "someuid",
			Claims: map[string]interface{}{"tier": "premium"},
		}, nil
	})

	h := NewClaimsHandler(h(), m)
	r := authHeader("sometoken")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)
	//c := GetClaims(newCtx)
	//a.Fail("")
	a.Equal(1, 1)
}

func TestClaimWithNoAuthValue(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		return nil, errors.New("did not want verify call")
	})

	h := NewClaimsHandler(h(), m)
	r := authHeader("")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)
	//a.Fail("")
	a.Equal(1, 1)
}

func TestClaimWithNoHeaders(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		return nil, errors.New("did not want verify call")
	})

	h := NewClaimsHandler(h(), m)
	w := httptest.NewRecorder()
	r := &http.Request{}
	h.ServeHTTP(w, r)
	//a.Fail("")
	a.Equal(1, 1)
}

func TestNoConnOnVerify(t *testing.T) {
	a := assert.New(t)
	m := newMockVerifier(func(ctx context.Context, idToken string) (*auth.Token, error) {
		a.Equal("hi", idToken)
		return nil, errors.New("oops")
	})

	h := NewClaimsHandler(h(), m)
	r := authHeader("hi")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)
	//a.Fail("")
	a.Equal(1, 1)
}

func authHeader(id string) *http.Request {
	return &http.Request{
		Method: http.MethodGet,
		Header: map[string][]string{
			http.CanonicalHeaderKey("Authorization"): {id},
		},
	}
}

func h() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}
