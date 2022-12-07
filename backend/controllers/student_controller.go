package controllers

import (
	"strconv"

	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/models"
	"github.com/gin-gonic/gin"
)

// Create
func CreateStudent(c *gin.Context) {
	db := database.GetDatabase()
	var student models.Student
	err := c.ShouldBindJSON(&student)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Create(&student).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot create student: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, student)
}

// Show one student
func ShowStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	var student models.Student
	err = db.First(&student, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find student: " + err.Error(),
		})
		return
	}
	c.JSON(200, student)
}

// Show all students
func ShowStudents(c *gin.Context) {
	db := database.GetDatabase()
	var students []models.Student
	err := db.Find(&students).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot list students: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, students)
}

// Update
func UpdateStudent(c *gin.Context) {
	db := database.GetDatabase()
	var student models.Student
	err := c.ShouldBindJSON(&student)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Save(&student).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot update student: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, student)
}

func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	err = db.Delete(&models.Student{}, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot delete student: " + err.Error(),
		})
		return
	}
	c.Status(204)
}
