const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://192.168.4.21:3000",
        methods: ["GET", "POST"],
    },
});

// Room logic stuff
let rooms = new Set();

function generateRoom(hostSocket) {
    // Generate four random numbers as the room code
    let roomCode = Math.floor(1000 + Math.random() * 9000);

    // Use another room code if that one exists
    while (rooms.has(roomCode)) {
        roomCode = Math.floor(1000 + Math.random() * 9000);
    }

    rooms.add(roomCode);

    // Dealing with host disconnecting
    hostSocket.on("disconnect", () => {
        // TODO: Notify the players the host disconnected.`
        rooms.delete(roomCode);
        console.log(`Room ${roomCode} deleted because the host disconnected.`);
    });

    hostSocket.join(roomCode);
    hostSocket.emit("host_created_room", roomCode);
    console.log(`User with ID: ${hostSocket.id} created room ${roomCode}`);
}

io.on("connection", (socket) => {
    console.log("Socket ID: " + socket.id);

    // When I create a room, create the room and then send back the room code
    socket.on("create_room", () => {
        generateRoom(socket);
    });

    //socket.to(data.room).emit("receive_message", data);

    socket.on("disconnect", () => {
        console.log("User disconncted", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});
