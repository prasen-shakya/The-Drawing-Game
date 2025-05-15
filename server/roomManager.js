// -----------------------------
// Imports
// -----------------------------
const { GAME_STATE } = require("./constants");

// -----------------------------
// Room Data Structure
// -----------------------------
const rooms = new Map(); // roomCode -> { host: socket, players: Map<socket.id, username>, gameState }

// -----------------------------
// Generate a Unique Room
// -----------------------------
function generateRoom(socket, callback) {
    let roomCode;
    do {
        roomCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while (rooms.has(roomCode));

    rooms.set(roomCode, {
        host: socket,
        players: new Map(),
        gameState: GAME_STATE.WAITING,
    });

    socket.data.roomCode = roomCode;
    socket.data.role = "host";
    socket.join(roomCode);

    callback(roomCode);

    console.log(`Host [${socket.id}] created room ${roomCode}`);
}

// -----------------------------
// Start A Room's Game
// -----------------------------
function startRoomGame(roomCode, callback) {
    if (!rooms.has(roomCode)) return false;

    const room = rooms.get(roomCode);

    room.gameState = GAME_STATE.PICK_IMAGE;

    callback(room.gameState);
}

// -----------------------------
// Add a Player to a Room
// -----------------------------
function addPlayer(socket, username, roomCode) {
    if (!rooms.has(roomCode)) return false;

    const room = rooms.get(roomCode);

    socket.data.username = username;
    socket.data.roomCode = roomCode;
    socket.data.role = "player";

    room.players.set(socket.id, username);
    socket.join(roomCode);

    socket
        .to(roomCode)
        .emit("players_in_room_changed", Array.from(room.players.values()));

    console.log(`Player ${username} joined room ${roomCode}`);
    return true;
}

// -----------------------------
// Remove a Player from a Room
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
// Close a Room (Host Disconnected)
// -----------------------------
function closeRoom(roomCode, io) {
    const room = rooms.get(roomCode);
    if (!room) return;

    io.socketsLeave(roomCode);
    rooms.delete(roomCode);

    console.log(`Room ${roomCode} closed (host disconnected)`);
}

// -----------------------------
// Check if Room Exists
// -----------------------------
function roomExists(roomCode) {
    return rooms.has(roomCode);
}

// -----------------------------
// Export Room Manager Functions
// -----------------------------
module.exports = {
    generateRoom,
    addPlayer,
    removePlayer,
    closeRoom,
    roomExists,
    startRoomGame,
};
