package models

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey"`
	Description string `json:"description"`
	Activities  []Activity
}
