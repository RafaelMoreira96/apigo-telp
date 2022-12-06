package models

import "gorm.io/gorm"

type Activity struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey"`
	Description string `json:"description"`
	CourseID    uint   `gorm:"foreignKey"`
}
