import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import { Home, Profile, Enter, Admin, Newcomer, Volunteer } from "./Components/Pages/pages";
// import Rooms from "./Components/Messenger/Rooms/Rooms";
import Getmessages from "./Components/Messenger/Getmessages";

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
        {/* <Route path="/messenger" element={<Rooms />} /> */}
        <Route path="/messenger" element={<Getmessages />} />
        <Route path="/calendar" element={<BigCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
