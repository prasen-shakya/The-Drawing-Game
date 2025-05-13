// -----------------------------
// Imports
// -----------------------------
import React, { useState, useEffect, useRef, useContext } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../App";

// -----------------------------
// Home Component
// -----------------------------
const Home = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const socket = useSocket(); // Get socket instance from context

    // -----------------------------
    // Host Game Handler
    // -----------------------------
    function hostGame() {
        if (socket) {
            socket.emit("create_room", (roomCode) => {
                navigate(`/host/${roomCode}`); // Navigate to the host page with room code
            });
        } else {
            console.error("Socket not initialized");
        }
    }

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <>
            <img
                className="h-[150px] w-[500px] transition-all"
                src="/logo.svg"
                alt="The drawing game logo"
            />
            <button
                className="w-[450px] h-[80px] bg-[#4E8098] font-bold rounded text-5xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer"
                onClick={hostGame}
            >
                HOST GAME
            </button>
        </>
    );
};

export default Home;
