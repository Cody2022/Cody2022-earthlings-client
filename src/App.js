import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Carousel from "./Components/ImageCarousel/Carousel";
import Navbar from "./Components/Navigation/Navbar";
import Translate from "./Components/Translator/Translate";
import BigCalendar from "./Components/Calendar/BigCalendar";
import { Home, Profile, Enter, Admin, Newcomer, Volunteer } from "./Components/Pages/pages";
import Navbar from "./Components/Navigation/Navbar";
import Rooms from "./Components/Messenger/Rooms/Rooms";

function App() {
  return (
    <div>
      <header className="navbar">
        <Navbar />
      </header>
      <Carousel />
      {/* <Translate /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newcomer" element={<Newcomer />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messenger" element={<Rooms />} />
        <Route path="/calendar" element={<BigCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
