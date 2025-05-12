import React, { useState, useEffect, useRef, useContext } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../App";

const Home = () => {
    const navigate = useNavigate();

    const socket = useSocket();

    socket.on("host_created_room", (roomCode) => {
        navigate(`/host/${roomCode}`);
    });

    function hostGame() {
        if (socket) {
            socket.emit("create_room");
        } else {
            console.error("Socket not initialized");
        }
    }

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
