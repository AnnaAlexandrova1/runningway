package memory

import (
	"api/internal/domain"
	"context"
	"sync"
	"sync/atomic"
)

type StatisticRepository struct {
	totalStatic int64
	//Compares    map[string]int64 // key:total
	Compares sync.Map // key:total

	mu sync.RWMutex
}

var _ domain.StatisticRepository = &StatisticRepository{}

func NewStatisticRepository() *StatisticRepository {
	return &StatisticRepository{
		totalStatic: 0,
		Compares:    sync.Map{},
	}
}

func (s *StatisticRepository) GetStatistic(ctx context.Context) (*domain.Statistics, error) {
	compares := make(map[string]int64)
	s.Compares.Range(func(key, value interface{}) bool {
		compares[key.(string)] = value.(int64)
		return true
	})

	return &domain.Statistics{
		TotalStatic: atomic.LoadInt64(&s.totalStatic),
		Compares:    compares,
	}, nil
}

func (s *StatisticRepository) IncrementTotalStatic(ctx context.Context) error {
	atomic.AddInt64(&s.totalStatic, 1)

	return nil
}

func (s *StatisticRepository) IncrementTotalCompare(ctx context.Context, key string) error {
	for {
		actual, loaded := s.Compares.Load(key)
		if !loaded {
			if _, loaded = s.Compares.LoadOrStore(key, int64(1)); !loaded {
				return nil
			}

			continue
		}

		oldValue := actual.(int64)
		newValue := oldValue + 1
		if s.Compares.CompareAndSwap(key, oldValue, newValue) {
			return nil
		}
	}
}
