package auth

import (
	"context"
	"firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/pkg/errors"
	"google.golang.org/api/option"
	"strings"
)

func newFirebaseApp(ctx context.Context, credentialsFile string) (*firebase.App, error) {
	var opts []option.ClientOption
	if credentialsFile != "" {
		opts = append(opts, option.WithCredentialsFile(credentialsFile))
	}
	app, err := firebase.NewApp(ctx, nil, opts...)
	if err != nil {
		return nil, errors.Wrap(err, "error initializing app")
	}

	return app, nil
}

func NewAuthClient(ctx context.Context, credentialsFile string) (*auth.Client, error) {
	// Access auth service from the default app
	app, err := newFirebaseApp(ctx, credentialsFile)
	if err != nil {
		return nil, err
	}
	client, err := app.Auth(ctx)
	if err != nil {
		return nil, errors.Wrap(err, "error getting Auth client")
	}

	err = client.DeleteUser(ctx, ".") // fake delete user to test connection
	if err != nil && !strings.Contains(err.Error(), "USER_NOT_FOUND") {
		return nil, errors.Wrap(err, "error getting Auth client")
	}

	return client, nil
}

func NewAuthVerifier(ctx context.Context, client *auth.Client) (Verifier, error) {
	return &firebaseVerifier{client: client}, nil
}
