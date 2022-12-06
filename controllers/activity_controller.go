package controllers

import (
	"strconv"

	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/models"
	"github.com/gin-gonic/gin"
)

// Show one activity
func ShowActivity(c *gin.Context) {
	id := c.Param("id")

	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})

		return
	}

	db := database.GetDatabase()

	var activity models.Activity
	err = db.First(&activity, newid).Error

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot find activity: " + err.Error(),
		})

		return
	}

	c.JSON(200, activity)
}

func CreateActivity(c *gin.Context) {
	db := database.GetDatabase()

	var activity models.Activity

	err := c.ShouldBindJSON(&activity)

	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})

			return
		}
	}

	err = db.Create(&activity).Error

	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot create activity: " + err.Error(),
			})

			return
		}
	}

	c.JSON(200, activity)
}

func ShowActivities(c *gin.Context) {
	db := database.GetDatabase()

	var activities []models.Activity
	err := db.Find(&activities).Error

	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot list activities: " + err.Error(),
			})

			return
		}
	}

	c.JSON(200, activities)
}

func UpdateBook(c *gin.Context) {
	db := database.GetDatabase()

	var activity models.Activity

	err := c.ShouldBindJSON(&activity)

	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot bind JSON: " + err.Error(),
			})

			return
		}
	}

	err = db.Save(&activity).Error

	if err != nil {
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Cannot update activity: " + err.Error(),
			})

			return
		}
	}

	c.JSON(200, activity)
}

func DeleteActivity(c *gin.Context) {
	id := c.Param("id")

	newid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID has to be integer",
		})

		return
	}

	db := database.GetDatabase()

	err = db.Delete(&models.Activity{}, newid).Error

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Cannot delete activity: " + err.Error(),
		})

		return
	}

	c.Status(204)
}
