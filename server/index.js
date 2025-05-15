// -----------------------------
// Imports
// -----------------------------
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const socketHandler = require("./socketHandler");

// -----------------------------
// Configure Env File
// -----------------------------
dotenv.config();

// -----------------------------
// Express Setup
// -----------------------------
const app = express();
app.use(cors());

// -----------------------------
// HTTP & Socket.IO Server Setup
// -----------------------------
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

// -----------------------------
// Attach Socket Handler
// -----------------------------
socketHandler(io);

// -----------------------------
// Start Server
// -----------------------------
server.listen(process.env.SERVER_PORT, () => {
    console.log("🚀 SERVER RUNNING ON PORT", process.env.SERVER_PORT);
});
