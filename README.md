# Simple Chat Application

A basic chat application built with HTML, CSS, JavaScript, Socket.IO, and Express.
This app allows multiple users to join chat rooms and communicate in real-time.

## Overview

This project is an implementation of Chat App. It was developed independently and from scratch.

## Development Process

This project was inspired by [Dave Gray](https://github.com/gitdagray) special thanks to him.

While I studied the concepts and approaches used in that project, all code has been independently written from scratch.

## Features

- **Real-time Communication**: Chat with multiple users in real-time using Socket.IO.
- **User Authentication**: Enter your name and room name to join the chat.
- **Welcome Message**: Receive a welcome message upon joining.
- **User Notifications**: Notifications for users joining or leaving the chat room.
- **User List**: View a list of users in the current room.
- **Active Room List**: View a list of active rooms across the application.
- **Typing Indicator**: See who is typing in the chat room.
- **State Management**: Manage chat state using JavaScript objects (no database required).
- **CORS Configuration**: Configure CORS for cross-origin requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HAWKZ4/Simple-Chat-App
   cd Simple-Chat-App
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and set the `NODE_ENV` variable:

   ```bash
   NODE_ENV=development
   ```

4. Start the application:
   - For production:
     ```bash
     npm start
     ```
   - For development with hot-reloading:
     ```bash
     npm run dev
     ```

## Usage

1.  **Setting Up the Client:**

    - Use a local server extension like Live Server for VS Code.
    - Open the `index.html` file located in `public/` using the Live Server extension.
    - Ensure the local server is running and serving the `index.html` file.

2.  **Accessing the Chat Application:**

    - Open your browser and navigate to the local server URL provided by the Live Server extension (e.g., `http://127.0.0.1:5500/public/index.html`).

3.  **Configuring CORS:**

    - Ensure the server is configured to allow CORS for the local server URL:
      `const io = new Server(expressServer, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});`

4.  **Joining the Chat:**

    - Enter your name and room name in the form fields and click the join button to start chatting.
    - Enjoy real-time chat with other users in the same room.

## Project Structure

```plaintext
simple-chat-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

- `public/`: Contains static files for the client-side application.
- `index.html`: Main HTML file for the chat interface.
- `style.css`: CSS file for styling the chat application.
- `app.js`: JavaScript file for client-side Socket.IO and UI interactions.
- `.env`: Environment variables configuration file.
- `package.json`: Lists dependencies and scripts for the application.
- `server.js`: Main server file handling Socket.IO connections and Express setup.

## Dependencies

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Socket.IO](https://socket.io/) - Enables real-time, bidirectional and event-based communication.
- [Nodemon](https://nodemon.io/) - A utility that will monitor for any changes in your source and automatically restart your server.

## Development Scripts

- `start`: Runs the application using Node.js.
- `dev`: Runs the application using Nodemon for automatic restarts during development.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
