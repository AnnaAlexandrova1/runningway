package domain

import "context"

type (
	Statistics struct {
		TotalStatic int64            `json:"total_static"`
		Compares    map[string]int64 `json:"compares"` // key:total
	}

	Compare struct {
		Key   string `json:"key"`
		Total int64  `json:"total"`
	}
)

type StatisticRepository interface {
	GetStatistic(ctx context.Context) (*Statistics, error)
	IncrementTotalStatic(ctx context.Context) error
	IncrementTotalCompare(ctx context.Context, key string) error
}
