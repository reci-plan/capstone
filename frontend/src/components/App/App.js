import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import Profile from "../Profile/Profile";
import apiClient from "../../services/apiClient";
import Wheel from "../Wheel/Wheel"

import { useDataLayerValue } from "../../context/DataLayer";

import "./App.css";
function App() {
  const [user, setUser] = useState({});
  // const [recipes, setRecipes] = useState({})

  const [{ colors }, dispatch] = useDataLayerValue();

  console.log("On App.js component, colors is: ", colors);



  // Remain logged in
  useEffect(() => {
    const token = localStorage.getItem("recipath_token");
    const fetchUser = async () => {
      const { data, error } = await apiClient.getUser();
      if (data) {
        setUser(data.user);
      }

      if (error) {
        console.log(`${error} ----------- App.js`);
      }
    };

    const tokenValid = async () => {
      if (token) {
        apiClient.setToken(token);
        await fetchUser();
      }
    };
    tokenValid();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
           <Route
            path="/recipes/:recipeId"
            element={<IndividualRecipe />}
          />
          <Route
            path="/wheel"
            element={<Wheel />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
