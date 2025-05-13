const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

// -----------------------------
// Set up
// -----------------------------
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

// -----------------------------
// Room Management
// -----------------------------
const rooms = new Map(); // roomCode -> { host: socket, players: Map<socket.id, username> }

function generateRoom(socket, callback) {
    let roomCode;

    // Generate unique 4-digit code
    do {
        roomCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while (rooms.has(roomCode));

    rooms.set(roomCode, {
        host: socket,
        players: new Map(),
    });

    socket.data.roomCode = roomCode;
    socket.data.role = "host";

    socket.join(roomCode);

    callback(roomCode);

    console.log(`Host [${socket.id}] created room ${roomCode}`);
}

// -----------------------------
// Add player into a room
// -----------------------------
function addPlayer(socket, username, roomCode) {
    if (!rooms.has(roomCode)) {
        return false;
    }

    const room = rooms.get(roomCode);

    socket.data.username = username;
    socket.data.roomCode = roomCode;
    socket.data.role = "player";

    room.players.set(socket.id, username);
    socket.join(roomCode);

    // Notify others and send success
    socket
        .to(roomCode)
        .emit("players_in_room_changed", Array.from(room.players.values()));

    console.log(`Player ${username} joined room ${roomCode}`);
    return true;
}

// -----------------------------
// Remove player from a room
// -----------------------------
function removePlayer(socket) {
    const roomCode = socket.data.roomCode;
    const username = socket.data.username;
    if (!roomCode || !username || !rooms.has(roomCode)) return;

    const room = rooms.get(roomCode);
    room.players.delete(socket.id);

    socket
        .to(roomCode)
        .emit("players_in_room_changed", Array.from(room.players.values()));
    console.log(`Player ${username} left room ${roomCode}`);
}

// -----------------------------
// Close a room when host disconnects
// -----------------------------
function closeRoom(roomCode) {
    const room = rooms.get(roomCode);
    if (!room) return;

    io.socketsLeave(roomCode);
    rooms.delete(roomCode);

    console.log(`Room ${roomCode} closed (host disconnected)`);
}

// -----------------------------
// Socket Event Handling
// -----------------------------
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("create_room", (callback) => {
        generateRoom(socket, callback);
    });

    socket.on("check_room_exists", (roomCode, callback) => {
        callback(rooms.has(roomCode));
    });

    socket.on("join_room", (roomCode, username, callback) => {
        // Let the user know if they were successful in joining the room
        callback(addPlayer(socket, username, roomCode));
    });

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);

        const role = socket.data.role;
        const roomCode = socket.data.roomCode;

        if (!roomCode) return;

        // If the player/host was in a room
        if (role === "host") {
            closeRoom(roomCode);
        } else if (role === "player") {
            removePlayer(socket);
        }
    });
});

// -----------------------------
// Run Server
// -----------------------------
server.listen(process.env.SERVER_PORT, () => {
    console.log("🚀 SERVER RUNNING ON PORT ", process.env.SERVER_PORT);
});
