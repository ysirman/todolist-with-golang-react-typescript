package main
import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"api/handler"
)
func main() {
	e := echo.New()
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// CORSの設定追加
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	// Routes
	e.GET("/api/todos", handler.ListTodo)
	e.GET("/api/todos/:id", handler.GetTodo)
	e.POST("/api/todos", handler.CreateTodo)
	e.PUT("/api/todos/:id", handler.UpdateTodo)
	e.DELETE("/api/todos/:id", handler.DeleteTodo)
	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
