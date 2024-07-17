package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Username  string `json:"username"`
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}

func main() {
	http.HandleFunc("/ws", handleConnections)
	go handleMessages()
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)
	log.Println("http server started on :3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()
	clients[ws] = true

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func SetCookie(w http.ResponseWriter, name, value string, expiration time.Time) {
	cookie := http.Cookie{
		Name:     name,
		Value:    value,
		Expires:  expiration,
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)
}

func GetCookie(r *http.Request, name string) (*http.Cookie, error) {
	cookie, err := r.Cookie(name)
	if err != nil {
		return nil, err
	}
	return cookie, nil
}

func handler(w http.ResponseWriter, r *http.Request) {
	expiration := time.Now().Add(24 * time.Hour)
	SetCookie(w, "username", "exampleUser", expiration)

	cookie, err := GetCookie(r, "username")
	if err != nil {
		w.Write([]byte("Cookie not found"))
		return
	}
	w.Write([]byte(fmt.Sprintf("Cookie value: %s", cookie.Value)))
}
