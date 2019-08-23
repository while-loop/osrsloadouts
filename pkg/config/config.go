package config

type Config struct {
	MongoAddr string `split_words:"true"`
	MongoDb   string `split_words:"true"`
	AuthKey   string `split_words:"true"`
	Creds     string `split_words:"true"`
	Port      int    `envconfig:"PORT"`
}
