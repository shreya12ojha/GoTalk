# Documentation of learnings of the server.go file - Part 1:

## Import statements:

```
import (
	"log"
	"net/http"
	"time"
	"github.com/gorilla/websocket"
	"fmt"
)
```

This piece of code is importing the required packages and dependencies:
### **log**: This package provides simple logging.

*Now, what is logging and why are we using it for our project?*

Logging is the process of recording events, messages, or other information that occurs within an application. It is crucial for monitoring, debugging, and maintaining software systems.

The following reasons give a clear explanation as to why we are using it:
- Log server startup and shutdown events.
- Record user connections and disconnections.
- Capture chat messages and actions for auditing.
- Log errors related to network issues, database operations, or other critical parts of the application.

### **net/http**: This package provides HTTP client and server implementations.

*Why net/http is needed:* provides the fundamental functionality for creating and running an HTTP server. This is crucial for our chat application to handle HTTP requests, such as serving the chat interface and handling WebSocket connections.

*What does net/http hold?*

- http server
- Handlers: functions that process http requests.
- Routing: to route incoming requests to the correct handler functions based on the URL path.



### **github.com/gorilla/websocket**: This package provides a WebSocket implementation for Go.

*Why is it required?*

This is pretty much the problem statement we took. Our main objective was to build a real-time chatting application using Go. This very helpful Go library provided WebSocket functionality.

**What ARE WebSockets?**

WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. It is designed for real-time, bidirectional communication between a client (e.g., a web browser) and a server.

The above makes it clear why we thought it would be a perfect tool for us to use it.

*What does it do for us?*
- WebSocket protocol support: The `gorilla/websocket` package implements the WebSocket protocol, which enables two-way communication between the client and the server over a single, long-lived connection.
- Reliable *(Well maintained and widely used)*
- Flexibility: It offers various configuration options, such as read and write buffer sizes, connection timeouts, and origin checks, allowing you to customize its behavior to suit your application's needs.

### **fmt**: This package provides formatted I/O functions.

*Why is it required?*

The `fmt` package is essential for formatting and printing output in Go applications. It allows you to format strings, integers, and other data types in a way that is easy to read and debug.

*What does it do for us?*

- **String Formatting**: It provides functions like `fmt.Sprintf` for formatting strings with variables, which is useful for generating dynamic messages or output.
- **Print Statements**: Functions such as `fmt.Printf` and `fmt.Println` are used to print formatted output to the console or log files, which helps in debugging and monitoring application behavior.
- **Error Messages**: It formats error messages and other output in a standardized way, making it easier to track and understand issues in the code.

In our server code, `fmt` is used to format and output strings, such as when setting and retrieving cookies or displaying messages.


