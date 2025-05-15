// -----------------------------
// Imports
// -----------------------------
const {
    generateRoom,
    addPlayer,
    removePlayer,
    closeRoom,
    roomExists,
    startRoomGame,
} = require("./roomManager");

// -----------------------------
// Socket.IO Connection Handling
// -----------------------------
function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // -----------------------------
        // Host Creates Room
        // -----------------------------
        socket.on("create_room", (callback) => {
            generateRoom(socket, callback);
        });

        // -----------------------------
        // Host Starts A Game
        // -----------------------------
        socket.on("start_game", (roomCode, callback) => {
            startRoomGame(roomCode, callback);
        });

        // -----------------------------
        // Client Checks if Room Exists
        // -----------------------------
        socket.on("check_room_exists", (roomCode, callback) => {
            callback(roomExists(roomCode));
        });

        // -----------------------------
        // Player Joins a Room
        // -----------------------------
        socket.on("join_room", (roomCode, username, callback) => {
            callback(addPlayer(socket, username, roomCode));
        });

        // -----------------------------
        // Handle Socket Disconnect
        // -----------------------------
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);

            const role = socket.data.role;
            const roomCode = socket.data.roomCode;

            if (!roomCode) return;

            if (role === "host") {
                closeRoom(roomCode, io);
            } else if (role === "player") {
                removePlayer(socket);
            }
        });
    });
}

// -----------------------------
// Export Handler
// -----------------------------
module.exports = socketHandler;
