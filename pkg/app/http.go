package app

import (
	"encoding/json"
	"net/http"
)

func writeErrorStatus(w http.ResponseWriter, code int, err string) {
	w.WriteHeader(code)
	writeError(w, err)
}

func writeError(w http.ResponseWriter, err string) {
	json.NewEncoder(w).Encode(map[string]string{
		"error": err,
	})
}
