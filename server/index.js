import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";

const PORT = process.env.PORT || 3500;
const __dirname = import.meta.dirname;

const app = express();
const ADMIN = "Admin";

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// State
const usersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  // Every socket connection take it's ID
  console.log(`User: ${socket.id} connected`);

  // Upon connection
  socket.emit("message", buildMsg(ADMIN, "Welcome to Chat App!"));

  // Listen event from the client side
  socket.on("enterRoom", ({ name, room }) => {
    // It's automatic let the user leave the previous room and enter the new desired one
    // Leave previous room
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit("message", buildMsg(ADMIN, `${name} has left the room`));
    }

    // Put it in user list and avoid duplication (it's not a new user)
    const user = activateUser(socket.id, name, room);

    // Update user list in previous room
    if (prevRoom) {
      // Trigger the event here and send back the result to client side
      io.to(prevRoom).emit("userList", {
        users: getUsersInRoom(prevRoom),
      });
    }

    // Join room
    socket.join(user.room);

    // To user who joined
    socket.emit("message", buildMsg(ADMIN, `You have joined the ${user.room} chat room`));

    // To everyone else
    socket.broadcast
      .to(user.room)
      .emit("message", buildMsg(ADMIN, `${user.name} has joined the room`));

    // Update user list for room
    io.to(user.room).emit("userList", {
      users: getUsersInRoom(user.room),
    });

    // Update room list for all users
    io.emit("roomList", {
      rooms: getAllActiveRooms(),
    });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    userLeavesApp(socket.id);

    if (user) {
      // For just users in room
      io.to(user.room).emit("message", buildMsg(ADMIN, `${user.name} has left the room`));

      io.to(user.room).emit("userList", { users: getUsersInRoom(user.room) });

      // For all
      io.emit("roomList", {
        rooms: getAllActiveRooms(),
      });
    }

    console.log(`User ${socket.id} disconnected`);
  });

  // Here it name and text object it came from the client side sendMessage function
  // Listening for a message event
  socket.on("message", ({ name, text }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("message", buildMsg(name, text));
    }
  });

  // 2
  // Listen for activity
  socket.on("activity", (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      // To all users in same room except the sender
      socket.broadcast.to(room).emit("activity", name);
    }
  });
});

function buildMsg(name, text) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  };
}

// User functions
function activateUser(id, name, room) {
  const user = { id, name, room };
  // Because i don't want the user to be in two different rooms he must be in just one
  usersState.setUsers([...usersState.users.filter((user) => user.id !== id), user]);

  return user;
}

function userLeavesApp(id) {
  usersState.setUsers([...usersState.users.filter((user) => user.id !== id)]);
}

function getUser(id) {
  return usersState.users.find((user) => user.id === id);
}

function getUsersInRoom(room) {
  return usersState.users.filter((user) => user.room === room);
}

function getAllActiveRooms() {
  return Array.from(new Set(usersState.users.map((user) => user.room)));
}
