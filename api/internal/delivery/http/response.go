package http

import (
	"encoding/json"
	"net/http"
)

func JsonResponse(w http.ResponseWriter, code int, resp any) {
	if resp == nil {
		w.WriteHeader(code)
		return
	}

	response, err := json.Marshal(resp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(code)
	_, _ = w.Write(response)
}
