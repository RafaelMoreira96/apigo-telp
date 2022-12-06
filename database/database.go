package database

import (
	"log"

	"github.com/RafaelMoreira96/apigo-telp/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func Connect() *gorm.DB {
	database, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("error", err)
		return nil
	}
	db = database
	db.AutoMigrate(models.Activity{})
	db.AutoMigrate(models.Course{})
	db.AutoMigrate(models.Student{})
	db.AutoMigrate(models.GradeStudent{})
	db.AutoMigrate(models.CourseStudent{})
	return db.Begin()
}

func GetDatabase() *gorm.DB {
	return db
}
