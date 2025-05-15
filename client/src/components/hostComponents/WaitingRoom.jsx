// -----------------------------
// Imports
// -----------------------------
import React from "react";
import PlayerList from "./PlayerList";

const WaitingRoom = ({ players, roomCode, startGame }) => {
    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-3xl font-bold text-stone-900 tracking-wide">
                    Room Code: {roomCode}
                </p>

                {/* Display list of joined players */}
                <PlayerList players={players}></PlayerList>

                {/* Placeholder Start Game button */}
                <button
                    onClick={startGame}
                    className="w-[250px] h-[60px] bg-[#4E8098] font-bold rounded text-3xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer mt-4"
                >
                    START GAME
                </button>
            </div>
        </>
    );
};

export default WaitingRoom;
