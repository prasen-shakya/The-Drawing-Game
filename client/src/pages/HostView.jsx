// -----------------------------
// Imports
// -----------------------------
import React, { useState, useEffect } from "react";
import { useSocket } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import WaitingRoom from "../components/hostComponents/WaitingRoom";
import Spinner from "../components/Spinner";

// -----------------------------
// HostView Component
// -----------------------------
const HostView = () => {
    const { roomCode } = useParams(); // Get room code from the URL
    const [players, setPlayers] = useState([]); // Track list of players in the room
    const [gameState, setGameState] = useState("waiting");

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
    // Start Game Logic
    // -----------------------------
    function startGame() {
        if (players.length < 1) {
            return;
        }

        socket.emit("start_game", roomCode, (gameState) => {
            setGameState(gameState);
        });
    }

    // -----------------------------
    // Conditional UI Rendering
    // -----------------------------
    const renderContent = () => {
        if (gameState == "waiting") {
            return (
                <WaitingRoom
                    players={players}
                    roomCode={roomCode}
                    startGame={startGame}
                ></WaitingRoom>
            );
        }

        if (gameState == "pick_image") {
            return (
                <>
                    <p className="text-3xl font-bold text-stone-900 tracking-wide">
                        Starting Game
                    </p>
                    <Spinner />
                </>
            );
        }
    };

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
            {renderContent()}
        </>
    );
};

export default HostView;
