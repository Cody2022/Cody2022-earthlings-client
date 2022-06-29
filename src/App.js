import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import { Home, Profile, Enter, Admin, Newcomer, Volunteer } from "./Components/Pages/pages";
import ChatPage from "./Components/Pages/ChatPage";
import RequestForm from "./Components/Form/RequestForm"

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
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/calendar" element={<BigCalendar />} />
        {/* <Route path="/schedule" element={<CalendarPicker />} /> */}
        <Route path="/request" element={<RequestForm />} />

      </Routes>
    </div>
  );
}

export default App;
