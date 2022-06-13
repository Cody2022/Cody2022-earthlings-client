import "./App.css";
import { Route, Routes } from "react-router-dom";
import Carousel from "./Components/ImageCarousel/Carousel";
import Navbar from "./Components/Navigation/Navbar";
import Translate from "./Components/Translator/Translate";
import BigCalendar from "./Components/Calendar/BigCalendar";

function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Translate />
      <BigCalendar />
      {/* <Routes>
        <Route path="/calendar" element={<BigCalendar />} />
      </Routes> */}
    </>
  );
}

export default App;
