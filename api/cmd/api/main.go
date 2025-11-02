package main

import (
	"api/internal/delivery/http/handlers"
	"api/internal/delivery/http/middlewares"
	"api/internal/logger"
	"api/internal/repository/memory"
	"api/web"
	"context"
	"io/fs"
	"log"
	"log/slog"
	"net/http"
	"time"
)

const (
	apiAddress = ":443"

	tlsCert = "./data/client-cert.pem"
	tlsKey  = "./data/client-priv.pem"
)

func main() {

	logConfig := logger.Config{
		Level:      slog.LevelInfo,
		OutputPath: logger.OutputPathStdOut,
		Format:     logger.FormatText,
	}

	lgr, err := logger.New(logConfig)
	if err != nil {
		panic(err)
	}

	_, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	distFS, err := fs.Sub(web.Web, "build")
	if err != nil {
		log.Fatal(err)
	}

	statRepo := memory.NewStatisticRepository()
	statHandler := handlers.NewStatisticHandler(statRepo)

	mux := http.NewServeMux()

	mux.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			err = statRepo.IncrementTotalStatic(r.Context())
			if err != nil {
				lgr.Error(err.Error())
			}
		}

		http.FileServer(http.FS(distFS)).ServeHTTP(w, r)
	}))

	mux.HandleFunc("GET /api/v1/echo", handlers.Echo)
	mux.HandleFunc("GET /api/v1/stats", statHandler.GetStats)
	mux.HandleFunc("POST /api/v1/compare", statHandler.Compare)

	loggedMux := middlewares.Logging(mux, lgr)
	handler := middlewares.CORSMiddleware()(loggedMux)

	lgr.Info("Server started on", slog.String("addr", apiAddress))

	if err = http.ListenAndServeTLS(apiAddress, tlsCert, tlsKey, handler); err != nil {
		lgr.Error("Fail to run server: ", slog.String("error", err.Error()))
		panic(err)
	}
}
