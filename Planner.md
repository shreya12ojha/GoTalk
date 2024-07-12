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

​
