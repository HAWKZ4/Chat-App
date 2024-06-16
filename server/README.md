# Chat App

This project is a simple tutorial on WebSockets.
<br>
It includes a basic chat application where users can send messages to a server and receive responses.

## Project Structure

- **app/**: Contains the client-side code
  - `app.js`: Handles WebSocket communication on the client-side
  - `index.html`: The main HTML file with an input field and submit button
  - `style.css`: Basic styling for the HTML file
- **server/**: Contains the server-side code
  - `index.js`: Sets up a simple WebSocket server using Node.js
  - `node_modules/`: Project dependencies
  - `package.json` and `package-lock.json`: Dependency management files

## How to Run

1. **Install Dependencies**:
   - Navigate to the `server` directory and run `npm install` to install the necessary dependencies.

2. **Start the Server**:
   - Run `node server/index.js` to start the WebSocket server.

3. **Open the Client**:
   - Open `app/index.html` in a web browser to start the client-side application.

## Features

- Input field to send messages to the server
- Server responds back with the same message

This is a basic implementation to demonstrate WebSocket communication.

## Progress Updates

This README will be updated as the tutorial progresses and more features are added.