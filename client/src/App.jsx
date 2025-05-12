import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import desktopBackground from "./assets/desktop-background.png";

function App() {
    const [startedGame, setStartedGame] = useState(false);
    const [roomCode, setRoomCode] = useState(0);
    const [players, setPlayers] = useState([]);

    let socket;

    // I don't really know why this fixes the double rendering that strict mode brings
    useEffect(() => {
        socket = io("http://localhost:3001");

        // Socket logic needs to go in here I suppose...

        // Update room code
        socket.on("update_room_code", (roomCode) => {
            setRoomCode(roomCode);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    function hostGame() {
        setStartedGame(true);

        socket.emit("create_room");
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
            {!startedGame && (
                <button
                    className="w-[450px] h-[80px] bg-[#4E8098] font-bold rounded text-5xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer"
                    onClick={hostGame}
                >
                    HOST GAME
                </button>
            )}

            {startedGame && (
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
                                    <p className="text-xl font-medium">
                                        {player}
                                    </p>
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
            )}
        </div>
    );
}

export default App;
