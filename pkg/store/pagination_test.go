package store

import (
	"go.mongodb.org/mongo-driver/bson"
	"reflect"
	"testing"
)

func TestPagination_GetSort(t *testing.T) {
	type fields struct {
		Page   uint32
		Limit  uint32
		Sort   string
		Filter string
	}
	tests := []struct {
		name   string
		fields fields
		want   bson.D
	}{
		{"desc", fields{Sort: "-created"}, bson.D{{Key: "created", Value: -1}}},
		{"asc", fields{Sort: "created"}, bson.D{{Key: "created", Value: 1}}},
		{"nil", fields{Sort: ""}, bson.D{{Key: "updated", Value: -1}}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := Pagination{
				Page:   tt.fields.Page,
				Limit:  tt.fields.Limit,
				Sort:   tt.fields.Sort,
				Search: tt.fields.Filter,
			}
			if got := p.GetSort(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GetSort() = %v, want %v", got, tt.want)
			}
		})
	}
}
