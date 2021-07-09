import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from '../Navbar/Navbar'
import Home from "../Home/Home";
import Experiment from "../Experiment";

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiment" element={<Experiment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
