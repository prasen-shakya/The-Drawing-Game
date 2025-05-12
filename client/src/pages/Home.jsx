import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import desktopBackground from "../assets/desktop-background.png";

const Home = () => {
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        socketRef.current = io("http://localhost:3001");

        socketRef.current.on("host_created_room", (roomCode) => {
            navigate(`/host/${roomCode}`);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    function hostGame() {
        if (socketRef.current) {
            socketRef.current.emit("create_room");
        } else {
            console.error("Socket not initialized");
        }
    }

    return (
        <div
            className="h-screen w-screen bg-size-[1200px] flex flex-col justify-center items-center gap-8"
            style={{ backgroundImage: `url(${desktopBackground})` }}
        >
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
        </div>
    );
};

export default Home;
