package handler

import (
	"net/http"
	"github.com/labstack/echo"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Todo struct {
	Id int `gorm:"AUTO_INCREMENT" json:"id"`
	Detail string `gorm:"type:varchar(50);" json:"detail"`
}

func gormConnect() *gorm.DB {
	db,err := gorm.Open("mysql", "docker_user:docker_user_pwd@tcp(docker.for.mac.localhost:3306)/docker_db")
	if err != nil {
		panic(err.Error())
	}
	db.LogMode(true)
	return db
}

func CreateTodo(c echo.Context) (err error) {
	db := gormConnect()
	defer db.Close()
	todo := &Todo{}
	if err := c.Bind(todo); err != nil {
		return err
	}
	db.Create(&todo)
	return c.JSON(http.StatusCreated, todo)
}

func ListTodo(c echo.Context) (err error) {
	db := gormConnect()
	defer db.Close()
	db.AutoMigrate(&Todo{})

	var todos []Todo
	db.Find(&todos)
	return c.JSON(http.StatusOK, todos)
}

func GetTodo(c echo.Context) error {
	db := gormConnect()
	defer db.Close()
	db.AutoMigrate(&Todo{})

	if id := c.Param("id"); id != "" {
		var todo Todo
		db.First(&todo, id)
		return c.JSON(http.StatusOK, todo)
	} else {
		return c.JSON(http.StatusNotFound, nil)
	}
}

func UpdateTodo(c echo.Context) error {
	db := gormConnect()
	defer db.Close()

	newTodo := new(Todo)
	if err := c.Bind(newTodo); err != nil {
		return err
	}

	if id := c.Param("id"); id != "" {
		var todo Todo
		db.First(&todo, id).Update(newTodo)
		return c.JSON(http.StatusOK, todo)
	} else {
		return c.JSON(http.StatusNotFound, nil)
	}
}

func DeleteTodo(c echo.Context) error {
	db := gormConnect()
	defer db.Close()

	if id := c.Param("id"); id != "" {
		var deletedTodo Todo
		db.First(&deletedTodo, id)
		db.Where("id = ?", id).Delete(deletedTodo)
		return c.JSON(http.StatusOK, deletedTodo)
	} else {
		return c.JSON(http.StatusNotFound, nil)
	}
}
