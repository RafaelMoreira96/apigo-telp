package main

import (
	"github.com/RafaelMoreira96/apigo-telp/database"
	"github.com/RafaelMoreira96/apigo-telp/server"
)

func main() {
	database.Connect()

	server := server.NewServer()

	server.Run()
}
