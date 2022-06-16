import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Profile, Enter, Admin, Newcomer, Volunteer } from "./Components/Pages/pages";

import Navbar from "./Components/Navigation/Navbar";
import Rooms from "./Components/Messenger/Rooms/Rooms";

function App() {
  return (
    <div>
      <header className="navbar">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newcomer" element={<Newcomer />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messenger" element={<Rooms />} />
      </Routes>
    </div>
  );
}

export default App;
