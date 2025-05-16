// -----------------------------
// Imports
// -----------------------------
import React, { useState } from "react";
import Alert from "../sharedComponents/Alert";

// -----------------------------
// RoomForm Component
// -----------------------------
const RoomForm = ({ joinRoom, message }) => {
    const [roomCode, setRoomCode] = useState(""); // Room code input state
    const [username, setUsername] = useState(""); // Player name input state

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                joinRoom(roomCode, username); // Attempt to join room
            }}
        >
            <div className="flex flex-col gap-4">
                {/* Room Code Input */}
                <Alert message={message}></Alert>
                <div>
                    <label
                        htmlFor="room_code"
                        className="block mb-2 text-xl font-semibold text-[#4E8098]"
                    >
                        Room Code
                    </label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="room_code"
                        className="text-xl bg-[#FCF7F8] border-[#B7B7B7] border-3 px-5 py-3 rounded-2xl font-semibold placeholder:text-[text-[#807C7C]]"
                        placeholder="Enter Room Code"
                        required
                        onChange={(event) => {
                            setRoomCode(event.target.value);
                        }}
                    />
                </div>

                {/* Player Name Input */}
                <div>
                    <label
                        htmlFor="player_name"
                        className="block mb-2 text-xl font-semibold text-[#4E8098]"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="player_name"
                        className="text-xl bg-[#FCF7F8] border-[#B7B7B7] border-3 px-5 py-3 rounded-2xl font-semibold placeholder:text-[text-[#807C7C]]"
                        placeholder="Enter Player Name"
                        required
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="h-15 bg-[#4E8098] font-bold rounded text-3xl transition-all text-[#FCF7F8] hover:cursor-pointer mt-4"
                >
                    JOIN GAME
                </button>
            </div>
        </form>
    );
};

export default RoomForm;
