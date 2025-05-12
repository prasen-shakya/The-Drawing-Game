import React from "react";

const PlayerView = () => {
    return (
        <>
            <img
                className="h-[100px] w-[250px] transition-all"
                src="/logo.svg"
                alt="The drawing game logo"
            />

            <form>
                <div className="flex flex-col gap-4">
                    <div>
                        <label
                            for="room_code"
                            class="block mb-2 text-xl font-semibold text-[#4E8098]"
                        >
                            Room Code
                        </label>
                        <input
                            type="text"
                            id="room_code"
                            class="text-xl bg-[#FCF7F8] border-[#B7B7B7] border-3 px-5 py-3 rounded-2xl font-semibold placeholder:text-[text-[#807C7C]]"
                            placeholder="Enter Room Code"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="player_name"
                            class="block mb-2 text-xl font-semibold text-[#4E8098]"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="player_name"
                            class="text-xl bg-[#FCF7F8] border-[#B7B7B7] border-3 px-5 py-3 rounded-2xl font-semibold placeholder:text-[text-[#807C7C]]"
                            placeholder="Enter Player Name"
                            required
                        />
                    </div>
                    <button className="h-15 bg-[#4E8098] font-bold rounded text-3xl transition-all text-[#FCF7F8] hover:cursor-pointer mt-4">
                        START GAME
                    </button>
                </div>
            </form>
        </>
    );
};

export default PlayerView;
