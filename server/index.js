const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Socket ID: " + socket.id);

    // When I create a room, create the room and then send back the room code
    socket.on("create_room", () => {
        // Generate four random numbers as the room code
        let roomCode = Math.floor(1000 + Math.random() * 9000);
        socket.join(roomCode);
        socket.emit("host_created_room", roomCode);

        console.log(`User with ID: ${socket.id} created room ${roomCode}`);
    });

    socket.on("send_message", (data) => {
        //socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconncted", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});
