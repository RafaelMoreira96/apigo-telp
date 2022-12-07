package models

type CourseStudent struct {
	ID        uint `gorm:"primaryKey"`
	StudentID uint `gorm:"foreignKey"`
	CourseID  uint `gorm:"foreignKey"`
}
