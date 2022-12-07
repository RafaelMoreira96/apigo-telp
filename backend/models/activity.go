package models

type Activity struct {
	ID          uint   `gorm:"primaryKey"`
	Description string `json:"description"`
	CourseID    uint   `gorm:"foreignKey"`
}
