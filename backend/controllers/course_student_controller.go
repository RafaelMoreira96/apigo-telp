package controllers

import (
	"strconv"

	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/models"
	"github.com/gin-gonic/gin"
)

func CreateCourseStudent(c *gin.Context) {
	db := database.GetDatabase()
	var courseStudent models.CourseStudent

	//Verifica se o JSON está OK
	err := c.ShouldBindJSON(&courseStudent)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}

	// Verificar se já existe no banco de dados
	var courseStudents []models.CourseStudent
	db.Find(&courseStudents)
	idCourse := courseStudent.CourseID
	idStudent := courseStudent.StudentID
	for i := 0; i < len(courseStudents); i++ {
		if courseStudents[i].CourseID == idCourse && courseStudents[i].StudentID == idStudent {
			c.JSON(400, gin.H{"error": "Já está salvo"})
			return
		}
	}

	// Salvar
	err = db.Create(&courseStudent).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot create course: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, courseStudent)
}

// Show one courseStudent
func ShowCourseStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	var courseStudent models.CourseStudent
	err = db.First(&courseStudent, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find courseStudent: " + err.Error(),
		})
		return
	}
	c.JSON(200, courseStudent)
}

// Show all students
func ShowCourseStudents(c *gin.Context) {
	db := database.GetDatabase()
	var students []models.CourseStudent
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
func UpdateCourseStudent(c *gin.Context) {
	db := database.GetDatabase()
	var courseStudent models.CourseStudent
	err := c.ShouldBindJSON(&courseStudent)
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})
			return
		}
	}
	err = db.Save(&courseStudent).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot update courseStudent: " + err.Error(),
			})
			return
		}
	}
	c.JSON(200, courseStudent)
}

func DeleteCourseStudent(c *gin.Context) {
	id := c.Param("id")
	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})
		return
	}
	db := database.GetDatabase()
	err = db.Delete(&models.CourseStudent{}, newid).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot delete courseStudent: " + err.Error(),
		})
		return
	}
	c.Status(204)
}
