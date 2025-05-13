// -----------------------------
// Imports
// -----------------------------
import { Route, Routes } from "react-router-dom";
import { createContext, useContext, useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import desktopBackground from "./assets/desktop-background.png";

import Home from "./pages/Home";
import HostView from "./pages/HostView";
import PlayerView from "./pages/PlayerView";
import Spinner from "./components/Spinner";

const serverURL = import.meta.env.VITE_SERVER_URL;
// -----------------------------
// Socket Context Setup
// -----------------------------
export const SocketContext = createContext(null); // Context for socket management

// Custom hook for accessing the socket context easily
export const useSocket = () => useContext(SocketContext);

// -----------------------------
// SocketProvider Component
// -----------------------------
const SocketProvider = ({ children }) => {
    const socketRef = useRef(null); // Store socket reference
    const [isReady, setIsReady] = useState(false); // Track if socket is connected

    // -----------------------------
    // Socket Connection Setup
    // -----------------------------
    useEffect(() => {
        // Create and establish the socket connection
        const socket = io(serverURL);
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected");
            setIsReady(true); // Update ready state when connected
        });

        return () => {
            socket.disconnect(); // Clean up connection on unmount
        };
    }, []);

    // -----------------------------
    // Render While Socket Is Not Ready
    // -----------------------------
    if (!isReady || !socketRef.current) {
        return (
            <div
                className="h-dvh w-screen bg-cover bg-center flex flex-col justify-center items-center gap-8"
                style={{ backgroundImage: `url(${desktopBackground})` }}
            >
                <Spinner /> {/* Show spinner while waiting for socket */}
            </div>
        );
    }

    // -----------------------------
    // Provide Socket to Children
    // -----------------------------
    return (
        <SocketContext.Provider value={socketRef.current}>
            <div
                className="h-dvh w-screen bg-cover bg-center flex flex-col justify-center items-center gap-8 text-[#0c0c0c]"
                style={{ backgroundImage: `url(${desktopBackground})` }}
            >
                {children} {/* Render child components once socket is ready */}
            </div>
        </SocketContext.Provider>
    );
};

// -----------------------------
// Main App Component
// -----------------------------
function App() {
    return (
        <SocketProvider>
            {" "}
            {/* Provide socket context to the app */}
            <Routes>
                {/* Define routes for Home, Host, and Player views */}
                <Route path="/" element={<Home />}></Route>
                <Route path="/host/:roomCode" element={<HostView />}></Route>
                <Route path="/player" element={<PlayerView />}></Route>
            </Routes>
        </SocketProvider>
    );
}

export default App;
