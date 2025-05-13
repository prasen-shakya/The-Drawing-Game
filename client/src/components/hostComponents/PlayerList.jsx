// -----------------------------
// Imports
// -----------------------------
import React from "react";

// -----------------------------
// PlayerList Component
// -----------------------------
const PlayerList = ({ players }) => {
    return (
        <div className="h-[500px] w-[450px] bg-[#FCF7F8] rounded-3xl drop-shadow-md border-2 border-gray-500 border-dashed flex flex-col items-center px-6">
            {/* Title */}
            <p className="text-2xl font-semibold text-stone-900 my-3">
                Player List
            </p>

            {/* -----------------------------
                Render Player List
            ----------------------------- */}
            <div className="flex flex-col gap-2 w-full px-6 overflow-y-auto pb-6">
                {players.map((player, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center bg-[#ffffff] p-4 rounded-xl shadow-md"
                    >
                        {/* Player Name */}
                        <p className="text-xl font-medium">{player}</p>

                        {/* Player Index */}
                        <span className="text-sm text-stone-900">
                            {index + 1}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;
