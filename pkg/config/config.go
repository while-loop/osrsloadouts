package config

import "time"

type Config struct {
	MongoAddr string `split_words:"true"`
	MongoDb   string `split_words:"true"`
	Creds     string `split_words:"true"`
	Port      int    `envconfig:"PORT"`

	RedisAddr string        `split_words:"true"`
	RedisPass string        `split_words:"true"`
	RedisDB   int           `split_words:"true" default:"0"`
	RedisTTL  time.Duration `default:"30m"`
}
