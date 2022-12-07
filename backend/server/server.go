package server

import (
	"net/http"

	"github.com/RafaelMoreira96/apigo-telp/server/routes"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/handlers"
)

/*
func CORS(c *gin.Context) {

		// First, we add the headers with need to enable CORS
		// Make sure to adjust these headers to your needs
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Content-Type", "application/json")

		// Second, we handle the OPTIONS problem
		if c.Request.Method != "OPTIONS" {

			c.Next()

		} else {

			// Everytime we receive an OPTIONS request,
			// we just return an HTTP 200 Status Code
			// Like this, Angular can now do the real
			// request using any other method than OPTIONS
			c.AbortWithStatus(http.StatusOK)
		}
	}
*/
type Server struct {
	port   string
	server *gin.Engine
}

func NewServer() Server {
	return Server{
		port:   "8080",
		server: gin.Default(),
	}
}

func (s Server) Run() {
	router := routes.ConfigRoutes(s.server)

	headers := handlers.AllowedHeaders([]string{"X-Request", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(router))
	router.Run()
}
