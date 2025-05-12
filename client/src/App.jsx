import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HostView from "./pages/HostView";
import PlayerView from "./pages/PlayerView";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/host/:roomCode" element={<HostView />}></Route>
            <Route path="/player" element={<PlayerView />}></Route>
        </Routes>
    );
}

export default App;
