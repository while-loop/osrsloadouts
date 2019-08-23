package auth

import (
	"context"
	"fmt"
)

// Check if the user has permissions to execute on other users
func HasAuthorization(ctx context.Context, userId string) error {
	claims := GetClaims(ctx)
	if claims == nil {
		return fmt.Errorf("no id token")
	}

	if claims.UserID != userId {
		return fmt.Errorf("permission denied")
	}

	return nil
}
