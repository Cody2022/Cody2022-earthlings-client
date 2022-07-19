import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import Footer from "./Components/Navigation/Footer";

import { Home, Profile, Enter, Admin, Newcomer, Volunteer, NewcomerTransport } from "./Components/Pages/pages";
import ChatPage from "./Components/Pages/ChatPage";
import AccommodationForm from "./Components/Form/AccommodationForm";
import TranslateVolunteerForm from "./Components/Form/TranslateVolunteerForm";
import TranslateFilterLists from "./Components/Form/TranslateFilterLists";
import VolunteersProfile from "./Components/Volunteers/VolunteersProfile";

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
        <Route path="/newcomertransport" element={<NewcomerTransport />} />
        <Route path="/accommodation" element={<AccommodationForm />} />
        <Route path="/testProfile" element={<VolunteersProfile />} />
        <Route path="/translateRequest" element={<TranslateVolunteerForm />} />
        <Route path="/translateForm" element={<TranslateVolunteerForm />} />
        <Route path="/translateList" element={<TranslateFilterLists />} />
                
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
