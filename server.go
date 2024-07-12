package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

<<<<<<< HEAD
var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel
=======
var clients = make(map[*websocket.Conn]string) // Map to store clients and their rooms
var broadcast = make(chan Message)
>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

<<<<<<< HEAD
// Message defines the structure of our messages
type Message struct {
=======
type Message struct {
	Room      string `json:"room"`
>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
	Username  string `json:"username"`
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}

func main() {
<<<<<<< HEAD
	// Configure WebSocket route
	http.HandleFunc("/ws", handleConnections)

	// Start listening for incoming chat messages
	go handleMessages()

	// Serve static files (optional, if you have an HTML file to serve)
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	// Start the server on localhost port 3000 and log any errors
=======
	http.HandleFunc("/ws", handleConnections)
	go handleMessages()

	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
	log.Println("http server started on :3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
<<<<<<< HEAD
	// Upgrade initial GET request to a WebSocket
=======
>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

<<<<<<< HEAD
	// Register new client
	clients[ws] = true

	for {
		var msg Message
		// Read new message as JSON and map it to a Message object
=======
	room := r.URL.Query().Get("room")
	if room == "" {
		log.Println("Room not specified")
		return
	}

	clients[ws] = room

	for {
		var msg Message
>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
<<<<<<< HEAD
		// Send new message to the broadcast channel
=======

>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
		broadcast <- msg
	}
}

func handleMessages() {
	for {
<<<<<<< HEAD
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
=======
		msg := <-broadcast
		for client, room := range clients {
			if room == msg.Room {
				err := client.WriteJSON(msg)
				if err != nil {
					log.Printf("error: %v", err)
					client.Close()
					delete(clients, client)
				}
>>>>>>> cb6e9a72f438120e85853fe492b31dfa356d2ba8
			}
		}
	}
}
