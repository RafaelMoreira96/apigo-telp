package controllers

import (
	"strconv"

	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/models"
	"github.com/gin-gonic/gin"
)

func CreateGradeStudent(c *gin.Context) {
	db := database.GetDatabase()
	var gradeStudent models.GradeStudent
	err := c.ShouldBindJSON(&gradeStudent)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Create(&gradeStudent).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot create grade: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, gradeStudent)
}

// Show one gradeStudent
func ShowGradeStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	var gradeStudent models.GradeStudent
	err = db.First(&gradeStudent, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find gradeStudent: " + err.Error(),
		})
		return
	}
	c.JSON(200, gradeStudent)
}

// Show all students
func ShowGradeStudents(c *gin.Context) {
	db := database.GetDatabase()
	var students []models.GradeStudent

	err := db.Where("student_id = ?", c.Param("StudentID")).Find(&students).Error
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
func UpdateGradeStudent(c *gin.Context) {
	db := database.GetDatabase()
	var gradeStudent models.GradeStudent
	err := c.ShouldBindJSON(&gradeStudent)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Save(&gradeStudent).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot update gradeStudent: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, gradeStudent)
}

func DeleteGradeStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	err = db.Delete(&models.GradeStudent{}, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot delete gradeStudent: " + err.Error(),
		})
		return
	}
	c.Status(204)
}
