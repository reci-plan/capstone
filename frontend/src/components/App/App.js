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
import PublicProfile from "../PublicProfile/PublicProfile";
import Generator from "../Generator/Generator";
import SearchFilter from "../SearchFilter/SearchFilter";
// import Community from "../Community/Community";
// import CommunityEdit from "../CommunityEdit/CommunityEdit";
import AboutUs from "../About/About";
import ContactUs from "../Contact/Contact";
import Footer from "../Footer/Footer";

import { useDataLayerValue } from "../../context/DataLayer";

import "./App.css";
function App() {
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [profile, setProfile] = useState({});
  const [flavors, setFlavors] = useState([]);
  const [saved, setSaved] = useState([]);
  const [changeSavePlan, setChangeSavePlan] = useState(false);
  const [savePlan, setSavePlan] = useState([]);
  const [mealPlanInfo, setMealPlanInfo] = useState([]);
  const [changeSave, setChangeSave] = useState(false);
  
  const [mealPlanIds, setMealPlanIds] = useState([]);
  const array1 = [1, 2, 3, 4]

  const allFlavors = [
    "spicy",
    "salty",
    "sweet",
    "sour",
    "bitter",
    "savory",
    "fatty",
  ];

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
      const { data, error } = await apiClient.fetchProfile();
      if (data) {
        setProfile(data);
        if (data.fav_flavors) {
          var flavors = [];
          data.fav_flavors.split("").forEach((c) => {
            let num = Number(c);
            var obj = { flavor: allFlavors[num], id: c };
            flavors.push(obj);
          });
          setFlavors(flavors);
        } else {
          setFlavors([]);
        }
      }
      if (error) {
        console.log(error, "Profile.js");
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch saved recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await apiClient.fetchSavedRecipes();
      if (data) {
        console.log("SAVED REC",data.savedRecipes)
        setSaved(data.savedRecipes);
      }

      if (error) {
        console.log(error, "fetch saved recipes");
      }
    };
    fetchRecipes();
  }, [user, changeSave]);
  
  // Handle save recipe
  const handleSave = async (r) => {
    const { data, error } = await apiClient.saveRecipe(r);

    if (data) {
      setChangeSave(!changeSave);
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
      setChangeSave(!changeSave);
      console.log("Unsave: ", data);
    }

    if (error) {
      alert(error);
    }
  };

  const handleUpdateUser = async (user) => {
    setUser(user);
  };
  
  // Fetch saved meal plans
  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await apiClient.fetchSavedMealPlans();
      //console.log("SAVED MEAL PLANS: ", data.savedMealPlans)
      if (error) {
        console.log(error, "fetch saved meal plans");
      }
      if (data) {
        console.log("Success- continue");
        var setMealPlans = []
        var recData = []
        var setMealInfo = []
        var planIds = []
        //Iterate over each recipe in each meal plan, and create a set of meal plans, where each set contains
        //recipe id numbers.
        data.savedMealPlans.forEach((s) => {
          var mealPlan = []
          var mealInfo = []
          for (let i = 0; i < 4; i++) {
            if (s[`recipe_id${i}`] !== null && typeof s[`recipe_id${i}`] != 'undefined') {
              if (!planIds.includes(s[`id`])) {
                planIds.push(s[`id`])
              }
              mealPlan.push(s[`recipe_id${i}`])
              mealInfo.push([s[`time${i}`], s[`meal_name${i}`]])
            }
          }
          setMealPlans.push(mealPlan)
          setMealInfo.push(mealInfo)
          console.log("SET PLANS", setMealPlans, "SET MEAL INFOS", setMealInfo, "MEAL IDS", planIds)
        })
        //const dataOne = await apiClient.fetchLocalDbRecipe(recId[0]);
        //console.log("FIRST REC", dataOne.data.recipe, recId[0])

        //Iterate over each set of meal plans and get the meal plan info
        //Add the mealplan id to the returned set
        for (const rec of setMealPlans) {
          console.log("MGMT", rec)
          var temp =[]
          for (let i = 0; i < rec.length; i++) {
            const recipeInfo = await apiClient.fetchLocalDbRecipe(rec[i])
            console.log("PEND", recipeInfo.data.recipe)
            temp.push(recipeInfo.data.recipe)
          }
          recData.push(temp)
          // const recipeInfo = await apiClient.fetchLocalDbRecipe(rec)
          // recData.push(recipeInfo.data.recipe)
        }
        console.log("SET:", recData, planIds)
        if (recData) {
          setSavePlan(recData);
        }

        if (setMealInfo) {
          setMealPlanInfo(setMealInfo);
        }

        if (planIds) {
          setMealPlanIds(planIds);
        }
      }
    };
    fetchPlans();
  }, [user, changeSavePlan]);

  // Handle unsave mealPlan
  const handleUnsavePlan = async (p) => {
    console.log("UUUU:", p)
    const { data, error } = await apiClient.fetchSavedMealPlan(p);
    //const { data, error } = await apiClient.unsavePlan(p);
    console.log("UNSAVED: ", data, p)

    if (data) {
      setChangeSavePlan(!changeSavePlan);
      console.log("Unsave: ", data);
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
            element={<Generator user={user}/>}
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
              <EditProfile
                user={user}
                handleUpdateUser={handleUpdateUser}
                profile={profile}
                flavors={flavors}
              />
            }
          />

          <Route
            path="/publicProfile/:user_id_here"
            element={<PublicProfile />}
          />

          <Route
            path="/saved"
            element={
              <SavedGallery
                user={user}
                saved={saved}
                savePlan={savePlan}
                mealPlanInfo={mealPlanInfo}
                mealPlanIds={mealPlanIds}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
                handleUnsavePlan={handleUnsavePlan}
              />
            }
          />

          <Route
            path="/search"
            element={
              <SearchFilter
                user={user}
                recipes={recipes}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
              />
            }
          />

          <Route
            path="/searchResults"
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

          {/*     <Route
            path="/community"
            element={
              <Community
                user={user}
                style={style}
                flavorOptions={flavorOptions}
              />
            }
          />

          <Route
            path="/community/edit/:postId"
            element={
              <CommunityEdit
                user={user}
                style={style}
                flavorOptions={flavorOptions}
              />
            }
          />*/}

          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
