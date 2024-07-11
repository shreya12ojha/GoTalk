# GoTalk

## Index
- **[About](#about)**
- **[Features](#features)**
- **[Instructions for running locally](#Instructions-for-running-locally)**
- **[Screenshots](#screenshots)**
- **[Tech Stack](#tech-stack)**   
- **[File Structure](#file-structure)**
## About
GoTalk is a real-time chatting application. This project aims to facilitate communication between users along with retrieving past chats. 

## Features
- **User Authentication:** Secure user login and registration using Firebase Authentication.
- **Real-Time Messaging:** Instant message sending and receiving using WebSockets.
- **Past Chat Retrieval:** Retrieve and display previous chat messages from the Firebase real-time database.
- **Responsive UI:** A user-friendly interface developed with JavaScript and basic styling.

## Instructions for running locally

### Initial steps

1. Clone the repository by using the below command:

```
$ git clone https://gitlab.com/hacktivists/gotalk.git
$ cd gotalk
```

2. Open the chat application window.
<br>

      This can be done in two ways:
- Open the "index.html" directly in the web browser. 
- Run the following command in the terminal:
```
$ <browser_name> index.html
```
3. The web app would start running at http://localhost:3000

## Screenshots

## Tech Stack

**Frontend**:
- HTML
- CSS
- JavaScript
- Bootstrap

**Backend and database management**:
- Gorilla web socket (Used Golang)
- Firebase Console 

## File Structure

- Presentation has been attached as and `presentation.pdf` and `presentation.pdf` with the relevant contents within `Presentation/`
- Screenshots have been attached in `Screenshots/`
