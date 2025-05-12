import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import desktopBackground from "../assets/desktop-background.png";

const HostView = () => {
    const { roomCode } = useParams();
    const [players, setPlayers] = useState([]);

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
            <div className="flex flex-col gap-4 items-center">
                <p className="text-3xl font-bold text-stone-900 tracking-wide">
                    Room Code: {roomCode}
                </p>
                <div className="h-[500px] w-[450px] bg-[#FCF7F8] rounded-3xl drop-shadow-md border-2 border-gray-500 border-dashed flex flex-col items-center px-6">
                    <p className="text-2xl font-semibold text-stone-900  my-3">
                        Player List
                    </p>
                    {/* Player List */}
                    <div className="flex flex-col gap-2 w-full px-6 overflow-y-auto pb-6">
                        {players.map((player, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-[#ffffff] p-4 rounded-xl shadow-md"
                            >
                                <p className="text-xl font-medium">{player}</p>
                                <span className="text-sm text-stone-900">
                                    {index + 1}{" "}
                                    {/* You can add more info like 'Joined' here */}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-[250px] h-[60px] bg-[#4E8098] font-bold rounded text-3xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer mt-4">
                    START GAME
                </button>
            </div>
        </div>
    );
};

export default HostView;
