import "./App.css";
import Carousel from "./Components/ImageCarousel/Carousel";
import Navbar from "./Components/Navigation/Navbar";
import Translate from "./Components/Translator/Translate";


function App() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Translate />
    </div>
  );
}

export default App;
