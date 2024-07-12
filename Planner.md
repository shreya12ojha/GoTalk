#  **GoTalk Journey**

1) Installation of Go: 
<br>
Official website: https://go.dev/dl/

​```$ sudo apt install golang-go​```

2) ## HTML FILE (index.html)

The chat application's primary HTML structure is found in the `index.html` file. It integrates the required JavaScript and CSS files and sets up the basic layout of our webpage. For step 1 of our project development, we have built an extremely simplistic webpage that solely serves the purpose of providing a basic space for users to type and receive messages in. Further development of the webpage will be done after a considerable level of functionality is achieved. The "style.css" file will be used to add design details later on.

### Synopsis:


- **Meta Tags** section: Specifies viewport parameters and character set for responsive design.
  
- The chat messages and the form for adding new messages are located in the chat container.
  - **Messages List (`ul#messages`)**: This is an unordered list where the chat messages will be shown.
  - **Message Form (`form#message-form`)**: A form for sending messages that has a submit button (`button#send-btn`) and an input field (`input#message-input`).

- **Scripts**:
  - To communicate with Firebase services, use the Firebase SDK, which includes the Firebase App and Firebase Database SDKs.
  - The main script includes `script.js`, which has the JavaScript code needed to manage the chat feature.

## CSS FILE ("styles.css")

The basic design of our chat application interface is specified in this file. It establishes a uniform font style throughout the application, ensures that buttons, input fields, and forms are appropriately spaced and aligned by providing styling for them. Messages are shown in a scrollable area and the chat container and messages list are designed to accommodate overflow.
To visually distinguish between sent and received messages, different styles are employed, such as distinct background colors and text alignment. System communications can be distinguished from user messages by their distinct style.

## script.js

The main features of our chat program are controlled by this JavaScript file. It initializes the Firebase and WebSocket connections and retrieves the username and room details from the URL parameters. Sending messages to the Firebase database and WebSocket server is handled by the `sendMessage` function. Additionally, it keeps an eye out for fresh messages from the WebSocket server and Firebase, presenting them in the chat window. Whether the messages are sent by the user, received from others, or system messages determines how they are formatted. When a new message is added, the chat interface automatically scrolls to the most recent one.

## "go.mod" and "go.sum"

Our project is called gotalk, and the go.mod file tells the Go programming language which version (1.22.5) we are using. It also specifies that in order for our project to function properly, github.com/gorilla/websocket version 1.5.3 is a necessary tool.

Security information is contained in the go.sum file. It contains unique codes, known as checksums, that guarantee the authenticity and the absence of tampering of the github.com/gorilla/websocket package. These codes aid in ensuring that our project will function precisely as intended when it is built.


## room.js

The `room.js` file implements the functionality to join chat rooms in our application. The `joinRoom` function retrieves the username entered by the user from an input field with the ID `username-input`. If a username is provided, it redirects the user to the `chat.html` page with URL parameters specifying the username and the chosen chat room (`room`). If no username is entered, it displays an alert asking the user to enter their name.

## server.go

Gorilla WebSocket (`github.com/gorilla/websocket`) is utilized to implement a WebSocket server in Go through the `server.go` file. It manages bidirectional communication for a chat application where users join chat rooms and communicate with each other in real-time.

### Code Description:

- **Variables and Imports**: Defines variables such as `clients` (a map of WebSocket connections to chat rooms) and `broadcast` (a channel for broadcasting messages) and imports necessary packages.

- **Message Struct**: Defines a message structure (`Message`) that handles data like `Room`, `Username`, `Message`, and `Timestamp` for chat messages.

- **Main Function (`main`)**: Serves static files, starts the HTTP server on port `:3000`, and configures HTTP routes, including WebSocket upgrading at `/ws`.

- **`handleConnections` Function**: Manages WebSocket upgrades, assigns clients to chat rooms, reads incoming messages, broadcasts valid messages to all clients, handles disconnections, and maintains client records on errors.

- **`handleMessages` Function**: Goroutine that broadcasts messages to clients in their respective chat rooms via the `broadcast` channel. Gracefully manages client disconnections.


​
