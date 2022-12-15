package models

type GradeStudent struct {
	ID         uint    `gorm:"primaryKey"`
	StudentID  uint    `gorm:"foreignKey"`
	ActivityID uint    `gorm:"foreignKey"`
	CourseID   uint    `gorm:"foreignKey"`
	Grade      float64 `json:"grade"`
}
