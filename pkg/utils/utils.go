package utils

import (
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
)

func Keys(obj interface{}, skips []string) []string {

	var k []string
	var inInterface map[string]interface{}
	inrec, _ := json.Marshal(obj)
	json.Unmarshal(inrec, &inInterface)

	// iterate through inrecs
	for field, _ := range inInterface {
		if Contains(field, skips) {
			continue
		}

		k = append(k, field)
	}

	return k

}



func Contains(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

func FilterM(m bson.M, validKeys []string) bson.M {
	n := bson.M{}
	for _, k := range validKeys {
		v, ok := m[k]
		if !ok {
			continue
		}
		n[k] = v
	}
	return n
}

func ToM(obj interface{}) bson.M {
	var m bson.M

	bsonBytes, _ := bson.Marshal(obj)
	bson.Unmarshal(bsonBytes, &m)
	return m
}