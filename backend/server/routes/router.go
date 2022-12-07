package routes

import (
	"github.com/RafaelMoreira96/apigo-telp/controllers"
	"github.com/gin-gonic/gin"
)

func ConfigRoutes(router *gin.Engine) *gin.Engine {
	main := router.Group("api/v1/")
	{
		activities := main.Group("activities")
		{
			activities.POST("/", controllers.CreateActivity)
			activities.GET("/:id", controllers.ShowActivity)
			activities.PUT("/", controllers.UpdateActivity)
			activities.DELETE("/:id", controllers.DeleteActivity)
			activities.GET("/", controllers.ShowActivities)
		}

		courses := main.Group("courses")
		{
			courses.POST("/", controllers.CreateCourse)
			courses.GET("/:id", controllers.ShowCourse)
			courses.GET("/", controllers.ShowCourses)
			courses.DELETE("/:id", controllers.DeleteCourse)
			courses.PUT("/", controllers.UpdateCourse)
		}

		students := main.Group("students")
		{
			students.POST("/", controllers.CreateStudent)
			students.GET("/:id", controllers.ShowStudent)
			students.GET("/", controllers.ShowStudents)
			students.DELETE("/:id", controllers.DeleteStudent)
			students.PUT("/", controllers.UpdateStudent)
		}

		gradeStudents := main.Group("grades")
		{
			gradeStudents.POST("/", controllers.CreateGradeStudent)
			gradeStudents.GET("/:id", controllers.ShowGradeStudent)
			gradeStudents.GET("/", controllers.ShowGradeStudents)
			gradeStudents.DELETE("/:id", controllers.DeleteGradeStudent)
			gradeStudents.PUT("/", controllers.UpdateGradeStudent)
		}

		courseStudents := main.Group("studentsCourse")
		{
			courseStudents.POST("/", controllers.CreateCourseStudent)
			courseStudents.GET("/:id", controllers.ShowCourseStudent)
			courseStudents.GET("/", controllers.ShowCourseStudents)
			courseStudents.DELETE("/:id", controllers.DeleteCourseStudent)
			courseStudents.PUT("/", controllers.UpdateCourseStudent)
		}
	}

	return router
}
