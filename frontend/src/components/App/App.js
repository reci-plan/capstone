import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import Profile from "../Profile/Profile";
import EditProfile from "../EditProfile/EditProfile";
import SearchPage from "../SearchPage/SearchPage";
import SavedGallery from "../SavedGallery/SavedGallery";
import apiClient from "../../services/apiClient";
import Wheel from "../Wheel/Wheel"

import { useDataLayerValue } from "../../context/DataLayer";

import "./App.css";
function App() {
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [profile, setProfile] = useState({})
  const [flavors, setFlavors] = useState([])

  const allFlavors = [
      'spicy', 
      'salty',
      'sweet',
      'sour',
      'bitter',
      'savory',
      'fatty'
  ];
  
  const [alreadyExist, setAlreadyExist] = useState(false);
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

  //  Fetch homepage recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await apiClient.fetchAllRecipes();

      if (data) {
        setRecipes(data.recipes);
      }

      if (error) {
        alert(error.message);
      }
    };
    fetchRecipes();
  }, []);

  // Fetch user profile 
  useEffect(() => {
    const fetchProfile = async () => {
        const { data, error } = await apiClient.fetchProfile()
        if (data) {
            setProfile(data)
            console.log(profile)
            if (data.fav_flavors) {
                var flavors = []
                data.fav_flavors.split("").forEach(c => {
                    let num = Number(c)
                    flavors.push(allFlavors[num])
                })
                setFlavors(flavors)
            }
            
        }
        if (error) {
            console.log(error, "Profile.js")
        }
    }

    fetchProfile()
  }, [])

  // Handle save recipe
  const handleSave = async (r) => {
    const { data, error } = await apiClient.saveRecipe(r);

    if (data) {
        console.log("Save: ", data);
    }

    if (error) {
        alert(error);
    }
  };

  // Handle unsave recipe
  const handleUnsave = async (r) => {
    const { data, error } = await apiClient.unsaveRecipe(r);

    if (data) {
        console.log("Unsave: ", data);
    }

    if (error) {
        alert(error);
    }
  };

  const handleUpdateUser = async (user) => {
    setUser(user)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          user={user}
          setUser={setUser}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                recipes={recipes}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            }
          />
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
            element={<IndividualRecipe user={user} />}
          />

          {/*Fix this route later*/}
          <Route
            path="/search/recipes/:recipeId"
            element={<IndividualRecipe user={user} />}
          />
          
          <Route
            path="/wheel"
            element={<Wheel />}
          />

          <Route
            path="/profile"
            element={
              <Profile user={user} profile={profile} flavors={flavors} />
            }
          />

          <Route
            path="/profile/edit"
            element={
              <EditProfile user={user} handleUpdateUser={handleUpdateUser} profile={profile} flavors={flavors} setFlavors={setFlavors}/>
            }
          />

          <Route
            path="/saved"
            element={
              <SavedGallery 
                user={user} 
                handleSave={handleSave} 
                handleUnsave={handleUnsave}
              />
            }
          />
          
          <Route
            path="/search"
            element={
              <SearchPage
                searchTerm={searchTerm}
                recipes={recipes}
                user={user}
                handleSave={handleSave} 
                handleUnsave={handleUnsave}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
