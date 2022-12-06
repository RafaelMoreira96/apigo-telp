package models

type Student struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `json:"name"`
	Semester int    `json:"semester"`
}
