// -----------------------------
// Imports
// -----------------------------
import React, { useState } from "react";
import { useSocket } from "../App";
import RoomForm from "../components/playerComponents/RoomForm";
import Spinner from "../components/Spinner";

// -----------------------------
// PlayerView Component
// -----------------------------
const PlayerView = () => {
    const [inRoom, setInRoom] = useState(false); // Track if the player has joined a room
    const socket = useSocket(); // Get socket instance from context

    // -----------------------------
    // Join Room Handler
    // -----------------------------
    function joinRoom(roomCode, username) {
        socket.emit("join_room", roomCode, username, (response) => {
            setInRoom(response); // Update state based on server response
        });
    }

    // -----------------------------
    // Conditional UI Rendering
    // -----------------------------
    const renderContent = () => {
        if (!inRoom) {
            return <RoomForm joinRoom={joinRoom} />;
        }

        // Show waiting screen after joining
        return (
            <>
                <p className="text-3xl font-bold text-stone-900 tracking-wide">
                    Waiting For Host...
                </p>
                <Spinner />
            </>
        );
    };

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <>
            <img
                className="h-[100px] w-[250px] transition-all"
                src="/logo.svg"
                alt="The drawing game logo"
            />
            {renderContent()}
        </>
    );
};

export default PlayerView;
