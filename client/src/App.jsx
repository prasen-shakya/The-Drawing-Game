import { Route, Routes } from "react-router-dom";
import { createContext, useContext, useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import desktopBackground from "./assets/desktop-background.png";

import Home from "./pages/Home";
import HostView from "./pages/HostView";
import PlayerView from "./pages/PlayerView";
import Spinner from "./components/Spinner";

// Create context once at the top level
export const SocketContext = createContext(null);

// Custom hook for easier use
export const useSocket = () => useContext(SocketContext);

// 3. SocketProvider component
const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Create socket connection
    useEffect(() => {
        const socket = io("http://192.168.4.21:3001");
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected");
            setIsReady(true);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // If we don't have the socket ready yet
    if (!isReady || !socketRef.current) {
        return (
            <div
                className="h-dvh w-screen bg-cover bg-center flex flex-col justify-center items-center gap-8"
                style={{ backgroundImage: `url(${desktopBackground})` }}
            >
                <Spinner></Spinner>
            </div>
        );
    }

    return (
        <SocketContext.Provider value={socketRef.current}>
            <div
                className="h-dvh w-screen bg-cover bg-center flex flex-col justify-center items-center gap-8 text-[#0c0c0c]"
                style={{ backgroundImage: `url(${desktopBackground})` }}
            >
                {children}
            </div>
        </SocketContext.Provider>
    );
};

function App() {
    return (
        <SocketProvider>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/host/:roomCode" element={<HostView />}></Route>
                <Route path="/player" element={<PlayerView />}></Route>
            </Routes>
        </SocketProvider>
    );
}

export default App;
