import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Experiment from "./components/Experiment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiment" element={<Experiment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
