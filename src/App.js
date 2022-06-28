import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import BigCalendar from "./Components/Calendar/BigCalendar";
<<<<<<< HEAD
import {
  Home,
  Profile,
  Enter,
  Admin,
  Newcomer,
  Volunteer,
} from "./Components/Pages/pages";
import Rooms from "./Components/Messenger/Rooms/Rooms";
import Footer from "./Components/Navigation/Footer";

=======
import { Home, Profile, Enter, Admin, Newcomer, Volunteer } from "./Components/Pages/pages";
<<<<<<< HEAD
import Rooms from "./Components/Messenger/Rooms/Rooms";
import CalendarPicker from "./Components/Calendar/CalendarPicker";
import RequestForm from "./Components/Form/RequestForm";
=======
import ChatPage from "./Components/Pages/ChatPage";
>>>>>>> 61c040a9998a1fe9c9e4ebb497cb15ab46d7e490
>>>>>>> 310c2c589ed3d084f6686786fc24c9d225697a08

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
<<<<<<< HEAD
        {/* <Route path="/messenger" element={<Rooms />} />  */}
=======
        <Route path="/chat" element={<ChatPage />} />
>>>>>>> 61c040a9998a1fe9c9e4ebb497cb15ab46d7e490
        <Route path="/calendar" element={<BigCalendar />} />
        {/* <Route path="/schedule" element={<CalendarPicker />} /> */}
        <Route path="/request" element={<RequestForm />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
