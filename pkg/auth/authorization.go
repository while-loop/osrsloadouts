package auth

import (
	"context"
	"github.com/while-loop/osrsinvy/pkg/errors"
	"github.com/while-loop/osrsinvy/pkg/utils"
	"net/http"
)

// Check if the user has permissions to execute on other users
func HasAuthorization(ctx context.Context, userId string) *errors.ApiError {
	claims := GetClaims(ctx)
	if claims == nil {
		return errors.NewApi(http.StatusUnauthorized, nil, "no id token")
	}

	if utils.Contains("admin", claims.Roles) {
		return nil
	}

	if claims.UserID != userId {
		return errors.NewApi(http.StatusForbidden, nil, "permission denied")
	}

	return nil
}
