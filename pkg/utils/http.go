package utils

import (
	"encoding/json"
	"github.com/while-loop/osrsloadouts/pkg/errors"
	"github.com/while-loop/osrsloadouts/pkg/log"
	"net/http"
)

func WriteApiError(w http.ResponseWriter, err *errors.ApiError) {
	log.Error(err.Err, " ", err.GetNice())
	WriteErrorStatus(w, err.Code, err.GetNice())
}

func WriteErrorStatus(w http.ResponseWriter, code int, err string) {
	w.WriteHeader(code)
	WriteJson(w, map[string]string{
		"error": err,
	})
}

func WriteJson(w http.ResponseWriter, obj interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(obj)
}

func ReadUserIP(r *http.Request) string {
	ipAddress := r.Header.Get("X-Real-Ip")
	if ipAddress == "" {
		ipAddress = r.Header.Get("X-Forwarded-For")
	}

	if ipAddress == "" {
		ipAddress = r.RemoteAddr
	}

	return ipAddress
}
