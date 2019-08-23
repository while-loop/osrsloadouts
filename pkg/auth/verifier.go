package auth

import (
	"context"
	"firebase.google.com/go/auth"
	"net/http"
)

type Verifier interface {
	Verify(ctx context.Context, idToken string) (*auth.Token, error)
	HandlerFunc(handlerFunc http.HandlerFunc) http.HandlerFunc
}

type firebaseVerifier struct {
	client *auth.Client
}

func (f *firebaseVerifier) HandlerFunc(handlerFunc http.HandlerFunc) http.HandlerFunc {
	c := &ClaimsHandler{h: handlerFunc, client: f}
	return func(w http.ResponseWriter, r *http.Request) {
		c.ServeHTTP(w, r)
	}
}
func (f *firebaseVerifier) Verify(ctx context.Context, idToken string) (*auth.Token, error) {
	return f.client.VerifyIDTokenAndCheckRevoked(ctx, idToken)
}

type mockVerifier struct {
	f func(ctx context.Context, idToken string) (*auth.Token, error)
}

func (m *mockVerifier) HandlerFunc(handlerFunc http.HandlerFunc) http.HandlerFunc {
	panic("implement me")
}
func (m *mockVerifier) Verify(ctx context.Context, idToken string) (*auth.Token, error) {
	return m.f(ctx, idToken)
}

func newMockVerifier(f func(ctx context.Context, idToken string) (*auth.Token, error)) Verifier {
	return &mockVerifier{f: f}
}
