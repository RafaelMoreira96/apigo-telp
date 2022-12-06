package routes

import (
	"github.com/RafaelMoreira96/apigo-telp/controllers"
	"github.com/gin-gonic/gin"
)

func ConfigRoutes(router *gin.Engine) *gin.Engine {
	main := router.Group("api/v1")
	{
		activities := main.Group("activities")
		{
			activities.POST("/", controllers.CreateActivity)
			activities.GET("/:id", controllers.ShowActivity)
			activities.PUT("/", controllers.UpdateBook)
			activities.DELETE("/:id", controllers.DeleteActivity)
			activities.GET("/", controllers.ShowActivities)
		}
		courses := main.Group("courses")
		{
			courses.POST("/", controllers.CreateCourse)
			courses.GET("/:id", controllers.ShowCourse)
			courses.GET("/", controllers.ShowCourses)
		}
	}

	return router
}
