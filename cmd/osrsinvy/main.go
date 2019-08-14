package main

import (
	"flag"
	"time"
)

var (
	v = flag.Bool("v", false, osrsinvy.Name+" version")
)

func main() {
	log.Infof("%s %s %s %s", osrsinvy.Name, osrsinvy.Version, osrsinvy.BuildTime, osrsinvy.Commit)
	flag.Parse()
	if *v {
		return
	}
}
