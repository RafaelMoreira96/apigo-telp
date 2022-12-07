package controllers

import (
	"strconv"

	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/models"
	"github.com/gin-gonic/gin"
)

// Create
func CreateCourse(c *gin.Context) {
	db := database.GetDatabase()
	var course models.Course
	err := c.ShouldBindJSON(&course)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Create(&course).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot create course: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, course)
}

// Show one course
func ShowCourse(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	var course models.Course
	var activities []models.Activity
	err = db.First(&course, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find course: " + err.Error(),
		})
		return
	}
	err = db.Where("course_id = ?", course.ID).Find(&activities).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot get activities list: " + err.Error(),
		})
	}
	course.Activities = activities
	c.JSON(200, course)
}

// Show all courses
func ShowCourses(c *gin.Context) {
	db := database.GetDatabase()
	var courses []models.Course
	err := db.Find(&courses).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot list activities: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, courses)
}

// Update
func UpdateCourse(c *gin.Context) {
	db := database.GetDatabase()
	var course models.Course
	err := c.ShouldBindJSON(&course)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Save(&course).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot update course: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, course)
}

func DeleteCourse(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	err = db.Delete(&models.Course{}, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot delete course: " + err.Error(),
		})
		return
	}
	c.Status(204)
}
