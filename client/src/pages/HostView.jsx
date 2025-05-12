import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "../components/hostComponents/PlayerList";

const HostView = () => {
    const { roomCode } = useParams();
    const [players, setPlayers] = useState([]);

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
                <PlayerList players={players}></PlayerList>
                <button className="w-[250px] h-[60px] bg-[#4E8098] font-bold rounded text-3xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer mt-4">
                    START GAME
                </button>
            </div>
        </>
    );
};

export default HostView;
