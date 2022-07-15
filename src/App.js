import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import Footer from "./Components/Navigation/Footer";

import {
  Home,
  Profile,
  Enter,
  Admin,
  Newcomer,
  Volunteer,
} from "./Components/Pages/pages";
import RequestForm from "./Components/Form/RequestForm";
import ChatPage from "./Components/Pages/ChatPage";
import AccommodationForm from "./Components/Form/AccommodationForm";
import volunteersProfile from "./Components/Volunteers/volunteersProfile";
import Testing from "./Components/Volunteers/Testing";
import BigCalendarTest from "./Components/Calendar/BigCalendarTest";
import VolunTransportForm from "./Components/Form/VolunteerTransportForm";
import TranslationSubmit from "./Components/Form/NewComersForms.jsx/TranslationSubmit";

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
        <Route path="/request" element={<RequestForm />} />
        <Route path="/accommodation" element={<AccommodationForm />} />
        <Route path="/testProfile" element={<Testing />} />
        <Route path="/transport" element={<VolunTransportForm />} />
        <Route path="/NewForm" element={<TranslationSubmit />} />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
