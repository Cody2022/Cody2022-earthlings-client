import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
import Footer from "./Components/Navigation/Footer";

import { Home, Profile, Enter, Admin, Newcomer, Volunteer, NewcomerTransport, NewcomerAccommodation, Education } from "./Components/Pages/pages";
import ChatPage from "./Components/Pages/ChatPage";
import AccommodationForm from "./Components/Form/AccommodationForm";
import VolunTransportForm from "./Components/Form/VolunteerTransportForm";
import TranslateVolunteerForm from "./Components/Form/TranslateVolunteerForm";
import VolunteerTransport from "./Components/Pages/VolunteerTransport";
import VolunteerAccommodation from "./Components/Pages/VolunteerAccommodation";
import { useAuth0} from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import TranslateNewcomerInfo from "./Components/Form/TranslateNewcomerInfo";

function App() {
  const { user } = useAuth0();
  // console.log('user is: ', user)
  const [userData, setUserData] = useState(false);

    useEffect(() => {
      const getFeaturedVolunteerInfo = async () => {
        try {
          const response = await axios.get("/name?email=" + user.email);
          setUserData(response.data);
          // console.log(response.data)
        } catch (err) {
          console.log(err.message);
        }
      };
      getFeaturedVolunteerInfo();
    }, [user]);
 

      
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
        <Route path="/translateForm" element={<TranslateVolunteerForm />} />
        <Route path="/translateList" element={<TranslateNewcomerInfo />} />
        <Route path="/transport" element={<VolunTransportForm />} />
        <Route path="/newcomeraccommodation" element={<NewcomerAccommodation />} />
        <Route path="/volunteertransport" element={<VolunteerTransport />}/>
        <Route path="/volunteeraccommodation" element={<VolunteerAccommodation />}/>
        <Route path="/education" element={<Education />}/>
        
        </Routes>
        </div>

      <Footer />
    </div>
  );
}

export default App;
