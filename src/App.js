import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Pages/Home";
import Navbar from "./Components/Navigation/Navbar";

function App() {
  return (
    <div>
      <header className="navbar">
          <Navbar />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes> 
    </div>
  );
}

export default App;
