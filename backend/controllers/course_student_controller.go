package controllers

import (
	"fmt"
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

func IsApproved(c *gin.Context) {
	db := database.GetDatabase()
	var courseStudents []models.CourseStudent
	err := db.Where("student_id = ?", c.Param("id")).Find(&courseStudents).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot list courses for this student: " + err.Error(),
			})
			return
		}
	}
	var gradeStudents []models.GradeStudent

	err = db.Where("student_id = ?", c.Param("id")).Find(&gradeStudents).Error
	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot list grades for this student: " + err.Error(),
			})
			return
		}
	}

	countActivity := 0
	var sum float64 = 0.0

	for i := 0; i < len(courseStudents); i++ {
		for j := 0; j < len(gradeStudents); j++ {
			if courseStudents[i].CourseID == gradeStudents[j].CourseID {
				countActivity++
				sum = sum + gradeStudents[j].Grade
				fmt.Println("Valor do objeto: ", gradeStudents[j].Grade)
				fmt.Println(sum)
			}
		}

		if sum/float64(countActivity) > 6.0 {
			courseStudents[i].IsApproved = true
			db.Save(&courseStudents[i])
		} else {
			courseStudents[i].IsApproved = false
			db.Save(&courseStudents[i])
		}

		c.JSON(200, &countActivity)
		c.JSON(200, &sum)

		countActivity = 0
		sum = 0.0
	}

	c.JSON(200, &courseStudents)
	c.JSON(200, &gradeStudents)

}
