package handlers

import (
	httpd "api/internal/delivery/http"
	"api/internal/repository/memory"
	"encoding/json"
	"log/slog"
	"net/http"
)

type Statistics struct {
	logger  slog.Logger
	storage *memory.StatisticRepository
}

func NewStatisticHandler(storage *memory.StatisticRepository) *Statistics {
	return &Statistics{
		storage: storage,
	}
}

func (s *Statistics) GetStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	resp, err := s.storage.GetStatistic(r.Context())
	if err != nil {
		s.logger.Error("fail to GetStats", slog.String("err", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
	}

	httpd.JsonResponse(w, http.StatusOK, resp)
}

type (
	CompareRequest struct {
		Key string `json:"key"`
	}
)

func (s *Statistics) Compare(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	var request CompareRequest

	err := decoder.Decode(&request)
	if err != nil {
		s.logger.Error("fail to GetStats", slog.String("err", err.Error()))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = s.storage.IncrementTotalCompare(r.Context(), request.Key)
	if err != nil {
		s.logger.Error("fail to GetStats", slog.String("err", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
	}

	httpd.JsonResponse(w, http.StatusOK, nil)
}
