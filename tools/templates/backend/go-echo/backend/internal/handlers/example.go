package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

func Example(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message":   "Hello from go-echo backend!",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}
