package models

type Course struct {
	ID          uint   `gorm:"primaryKey"`
	Description string `json:"description"`
	Activities  []Activity
}
