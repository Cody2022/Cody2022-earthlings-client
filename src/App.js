import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import Footer from "./Components/Navigation/Footer";

import { Home, Profile, Enter, Admin, Newcomer, Volunteer, NewcomerTransport, NewcomerAccommodation } from "./Components/Pages/pages";
import RequestForm from "./Components/Form/RequestForm";
import ChatPage from "./Components/Pages/ChatPage";
import AccommodationForm from "./Components/Form/AccommodationForm";
import VolunTransportForm from "./Components/Form/VolunteerTransportForm";
import TranslateVolunteerForm from "./Components/Form/TranslateVolunteerForm";
import TranslateFilterLists from "./Components/Form/TranslateFilterLists";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const { user } = useAuth0();
  console.log('user is: ', user)
  const [userData, setUserData] = useState(false);

    useEffect(() => {
      const getFeaturedVolunteerInfo = async () => {
        try {
          const response = await axios.get("/name?email=" + user.email);
          setUserData(response.data);
          console.log(response.data)
        } catch (err) {
          console.log(err.message);
        }
      };
      getFeaturedVolunteerInfo();
    }, [user]);
  console.log(`Logged in user is (${JSON.stringify(userData)})`)
  

      
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div>
        <header className="navbar">
          <Navbar userData={userData} />
        </header>
      </div>
      
      <div style={{
        flexGrow: 2
    }}>
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
        {/* <Route path="/testProfile" element={<VolunteersProfile />} /> */}
        <Route path="/translateForm" element={<TranslateVolunteerForm />} />
        <Route path="/translateList" element={<TranslateFilterLists />} />
        <Route path="/transport" element={<VolunTransportForm />} />
        <Route path="/newcomeraccommodation" element={<NewcomerAccommodation />} />
        {/* <Route path="/NewForm" element={<TranslationSubmit />} /> */}
        
        </Routes>
        </div>

      <Footer />
    </div>
  );
}

export default App;
