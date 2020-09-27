package errors

import (
	"fmt"
	"net/http"
)

type ApiError struct {
	Code int
	Err  error
	Nice string
}

func (e ApiError) GetNice() string {
	if e.Nice != "" {
		return e.Nice
	}

	return http.StatusText(e.Code)
}

func (e *ApiError) GetError() error {
	if e == nil {
		return nil
	}

	return e.Err
}

func NewApi(code int, err error, msg string) *ApiError {
	return &ApiError{
		Code: code,
		Err:  err,
		Nice: msg,
	}
}

func NewApif(code int, err error, format string, args ...interface{}) *ApiError {
	return &ApiError{
		Code: code,
		Err:  err,
		Nice: fmt.Sprintf(format, args...),
	}
}
