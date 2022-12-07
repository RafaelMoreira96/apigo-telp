package migrations

import (
	"github.com/RafaelMoreira96/apigo-telp/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) {
	db.AutoMigrate(models.Activity{})
}
