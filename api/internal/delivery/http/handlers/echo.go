package handlers

import "net/http"

func Echo(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{'status': 'Running Way'}"))
}
