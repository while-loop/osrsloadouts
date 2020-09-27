package errors

import (
	"fmt"
	"github.com/pkg/errors"
)

func New(msg string) error {
	return errors.New(msg)
}

func Newf(format string, args ...interface{}) error {
	return errors.New(fmt.Sprintf(format, args...))
}

func Wrap(err error, msg string) error {
	return errors.Wrap(err, msg)
}

func Wrapf(err error, fmt string, args ...interface{}) error {
	return errors.Wrapf(err, fmt, args...)
}
