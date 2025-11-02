package middlewares

import (
	"context"
	"log/slog"
	"net/http"
	"time"
)

func Logging(next http.Handler, logger *slog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Логируем начало обработки запроса.
		logger.Info("Incoming request",
			slog.String("method", r.Method),
			slog.String("url", r.URL.String()),
		)

		// Можно сохранить logger в контексте, если потребуется в обработчике.
		ctx := context.WithValue(r.Context(), "logger", logger)
		next.ServeHTTP(w, r.WithContext(ctx))

		// После обработки запроса логируем время выполнения.
		duration := time.Since(start)
		logger.Info("Request processed",
			slog.String("method", r.Method),
			slog.String("url", r.URL.String()),
			slog.Duration("duration", duration),
		)
	})
}

func CORSMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Разрешаем все origins (для разработки)
			origin := r.Header.Get("Origin")
			if origin != "" {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			} else {
				w.Header().Set("Access-Control-Allow-Origin", "*")
			}

			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD, TRACE, CONNECT")
			w.Header().Set("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Authorization, X-Tenant, Access-Control-Request-Method, Access-Control-Request-Headers")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Max-Age", "300")

			// Обработка preflight OPTIONS запросов
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
