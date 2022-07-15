import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import Footer from "./Components/Navigation/Footer";

import { Home, Profile, Enter, Admin, Newcomer, Volunteer, NewcomerTransport } from "./Components/Pages/pages";
import CalendarPicker from "./Components/Calendar/CalendarPicker";
import RequestForm from "./Components/Form/RequestForm";
import ChatPage from "./Components/Pages/ChatPage";

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
        <Route path="/newcomertransport" element={<NewcomerTransport />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
