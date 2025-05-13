// -----------------------------
// Imports
// -----------------------------
import React, { useState, useEffect } from "react";
import { useSocket } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "../components/hostComponents/PlayerList";

// -----------------------------
// HostView Component
// -----------------------------
const HostView = () => {
    const { roomCode } = useParams(); // Get room code from the URL
    const [players, setPlayers] = useState([]); // Track list of players in the room

    const navigate = useNavigate(); // Hook for  navigation
    const socket = useSocket(); // Get socket instance from context

    // ----------------------------
    // Check if Room Code Exists
    // ----------------------------
    socket.emit("check_room_exists", roomCode, (response) => {
        if (!response) {
            navigate("/"); // Navigate to the home
        }
    });

    // -----------------------------
    // Socket Listener Setup
    // -----------------------------
    useEffect(() => {
        if (!socket) return;

        // Listen for updates to the player list
        socket.on("players_in_room_changed", (playersList) => {
            setPlayers(playersList);
        });

        // Cleanup listener on component unmount
        return () => {
            socket.off("players_in_room_changed", (playersList) => {
                setPlayers(playersList);
            });
        };
    }, []);

    // -----------------------------
    // Render UI
    // -----------------------------
    return (
        <>
            <img
                className="h-[150px] w-[500px] transition-all"
                src="/logo.svg"
                alt="The drawing game logo"
            />
            <div className="flex flex-col gap-4 items-center">
                <p className="text-3xl font-bold text-stone-900 tracking-wide">
                    Room Code: {roomCode}
                </p>

                {/* Display list of joined players */}
                <PlayerList players={players}></PlayerList>

                {/* Placeholder Start Game button */}
                <button className="w-[250px] h-[60px] bg-[#4E8098] font-bold rounded text-3xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer mt-4">
                    START GAME
                </button>
            </div>
        </>
    );
};

export default HostView;
