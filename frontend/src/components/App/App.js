import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import IndividualRecipe from "../IndividualRecipe/IndividualRecipe";
import Profile from "../Profile/Profile";
import SearchPage from "../SearchPage/SearchPage";
import apiClient from "../../services/apiClient";

import { useDataLayerValue } from "../../context/DataLayer";

import "./App.css";
function App() {
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
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

  // when user clicks on save button
  const handleClickOnSave = async (r) => {
    // const { data, error } = await apiClient.checkIfRecipeExists(r);

    // // if cur recipe not in user's saved recipes
    // if (data.is_existing.length === 0) {
    //   const result = await apiClient.saveRecipe(r);
    //   console.log(result);
    //   if (result.data) {
    //     console.log("hi", result.data);
    //   }

    //   if (result.error) {
    //     alert(error);
    //   }
    // } else {
    //   setAlreadyExist(true);
    //   alert(
    //     `${JSON.stringify(
    //       data.is_existing[0].title
    //     )} already in user saved recipes`
    //   );
    // }
    const { data, error } = await apiClient.saveRecipe(r);
    if (data) {
      console.log("hi", data);
      // dispatch({type: "SET_SAVED", saved: })
    }

    if (error) {
      alert(error);
    }
  };

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
                handleClickOnSave={handleClickOnSave}
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
          <Route path="/recipes/:recipeId" element={<IndividualRecipe />} />

          {/*Fix this route later*/}
          <Route
            path="/search/recipes/:recipeId"
            element={<IndividualRecipe />}
          />

          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/search"
            element={
              <SearchPage
                searchTerm={searchTerm}
                recipes={recipes}
                user={user}
                handleClickOnSave={handleClickOnSave}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
