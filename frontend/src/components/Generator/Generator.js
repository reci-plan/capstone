import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './Generator.css'
import { Wheel } from 'react-custom-roulette'
import Popup from '../Popup/Popup'
import Menu from '../Menu/Menu'
import apiClient from "../../services/apiClient";
import RenderBox from "../RenderBox/renderBox";
import RecipeCard from '../RecipeCard/RecipeCard'

import pencil from '../../assets/pencil.svg'

var times = [''];
var meals = [''];
var recIds = [-1];
var recipes = []

var titles = [''];
var images = [''];
var preps = [''];
var ratings = [''];
var numMeal = 0;
var dum = -1;

export default function Generator({user}) {

  const [wheelIsVisible, setWheelIsVisible] = useState(true)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  //for recipe popup
  const [buttonPopup, setButtonPopup] = useState(false);
  //for meal plan popup
  const [mealPlanPopup, setMealPlanPopup] = useState(false);
  const [spinIsVisible, setSpinIsVisible] = useState(false);
  const [boxVals, setBoxVals] = useState(-1)
  const navigate = useNavigate();
  const [loadWheel, setLoadWheel] = useState([
    { option: "meal to"},
    { option: "begin"},
    { option: "Add a new"},
  ])

  const increment = () => {
    console.log("INCREMENTED")
    numMeal += 1
    setBoxVals(dum += 1)
  }
  
  const data = loadWheel;
  
  console.log("HERE'S THE DATA: ", data)
  console.log("MY ARR: ", times, meals, titles)

  console.log(data)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    console.log(newPrizeNumber)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
    console.log(data[newPrizeNumber].option)
    //console.log(data[prizeNumber].category)
  }
  
  const handleOpenForm = () => {
    setWheelIsVisible(false)
  }

  const handleCloseForm = () => {
    setWheelIsVisible(true)
  }

  const dummyLoadWheel = (passToParent) => {
    console.log("SELECTED CATEGORIES TO LOAD", Promise.resolve(passToParent))
    console.log("---------- TESTING ----------")
    if (passToParent) {

      passToParent.then(result => setLoadWheel(result[2].rows)).catch( err => console.log(err))
      passToParent.then(result => times[numMeal] = result[0]).catch( err => console.log(err))
      passToParent.then(result => meals[numMeal] = result[1]).catch( err => console.log(err))
    }
  }

  //Should return values to display for current recipe popup.
  const displayRecipePopup = async (recipeId) => {
    console.log("------------------------->", Promise.resolve(recipeId))
    var promise = Promise.resolve(recipeId);
    promise.then(function(val) {
      console.log("TRY PROMISE ----------->")
      console.log(val)
      console.log("Recipe Id", val)
      recipeId = val;
    });
    console.log("FETCHED: ", recipeId)
    const { data, err } = await apiClient.fetchLocalDbRecipe(recipeId);
    if (data) {
      console.log("MY PROM DATA", data)
      console.log("WANT TO RETURN", data.recipe.title)
      console.log("RESULT PROM", recipeId)
      recIds[numMeal] = recipeId;
      titles[numMeal] = data.recipe.title;
      recipes[numMeal] = data.recipe;
      
      images[numMeal] = data.recipe.image_url;
      preps[numMeal] = data.recipe.prep_time;
      ratings[numMeal] = data.recipe.rating;

      var tempAr = [titles[numMeal], images[numMeal], preps[numMeal], ratings[numMeal], recipes[numMeal]]

      return tempAr;
    }
  }
  
  const keepMeal = () => {
    console.log("TRY KEEP MEAL", times[numMeal], meals[numMeal])
    console.log("---------- TESTING ----------")
    increment();
    setButtonPopup();
    setSpinIsVisible();
    console.log("IND", dum)
  }

  const logMealPlan = async () => {
    var obj = {
      title: document.getElementById('mealPlanTitle').value,
      recipe_id1 : null,
      recipe_id2 : null,
      recipe_id3 : null,
      recipe_id4 : null,
      meal_name1: null,
      meal_name2: null,
      meal_name3: null,
      meal_name4: null,
      time1: null,
      time2: null,
      time3: null,
      time4: null
    }
    console.log("TRY KEEP MEAL PLAN", times, meals, recIds)
    var dBNum = 1;
    for (let i = 0; i < times.length; i++) {
      obj[`recipe_id${dBNum}`] = recIds[i] 
      obj[`meal_name${dBNum}`] = meals[i] 
      obj[`time${dBNum}`] = times[i] 
      dBNum += 1;
    }

    console.log(obj)

    const { data, err } = await apiClient.saveMealPlan(obj);
    if (data) {
      console.log("Successful load!")
      navigate("/saved");
      window.location.reload();
    }
    console.log("Recipe list: ", recipes)
  }

  return (
    <div className="Wheel">
      {!user.email ? (
        <div className="WheelMessage">
          Login <Link to="/login">here</Link> to spin the wheel and plan your meal!
        </div>
      ) : (
      <div className="Generator">
        <div className="header">Spin the wheel to plan your meal</div>
        <div className="fullPage">
          <div className="menuView">
            <div className="fake-input">
                <input type="text" required placeholder="Name your meal plan!" id="mealPlanTitle" ></input>
                <img src={pencil} width="25" alt="Edit your plan name"></img>
            </div>
            <div className="subHeader">Meals</div>
            {/*<div className="box"><p>{times[dum]}</p><p>{meals[dum]}</p><div className="penIc"><div onClick={(handleOpenForm)}><img src="https://i.imgur.com/SR5qJxc.png" className="add" alt="add meal"></img></div></div></div>*/}
            <div className="leftMenuArea"><RenderBox handleOpenForm = {handleOpenForm} dataWheelToBox={dum} renderMealData={[times, meals]}/></div>
            {dum >= 1 ?
                  <>
                    <div onClick={()=>setMealPlanPopup(true)}><button className="saveMealPlan">Save Meal Plan</button></div>
                  </> : 
                  ""
            }
          </div>
          <div className="wheelView">
          {wheelIsVisible ?
          <>
          {/* https://github.com/effectussoftware/react-custom-roulette */}
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={loadWheel}

              onStopSpinning={() => {
                setMustSpin(false)
                setButtonPopup(true)
              }}
            />
            {spinIsVisible ?
                  <>
                  <button onClick={handleSpinClick}>SPIN</button>
                  </> : 
                  ""
            }
          </> : 
          <div className="menuParent">
            <div className="menuHeader">
            <div className="close"><div onClick={(handleCloseForm)}><img src="https://svgshare.com/i/ZL_.svg"></img></div></div>
              <div className="menuItem">Edit a meal</div>
            </div>
            <Menu data={handleCloseForm} onClick2={setSpinIsVisible} passToParent={dummyLoadWheel}></Menu>
          </div>
          }
        </div>
        </div>

        {/* https://www.npmjs.com/package/react-wheel-of-prizes?activeTab=readme */}

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          {spinIsVisible ?
                    <>
                      {console.log("CRASH AT", data)}
                      {(data.length !== 0) && (data != null) && (typeof (data[prizeNumber]) !== 'undefined') ?
                            <>
                            {console.log("FINAL DATA", data)}
                            {console.log("aaaaaAAAAAAAAAAAA", (displayRecipePopup((data[prizeNumber].option)).then(data=>console.log("AAAAAA",data))))}
                            </> : 
                            ""
                      }
                      {console.log("Is this it?", recipes[numMeal])}
                      {typeof recipes[numMeal] !== 'undefined' ?
                      <>
                        {console.log("RECX", recipes[numMeal], recipes[numMeal].title, recipes[numMeal])}
                        <RecipeCard
                          user={user}
                          recipeInfo={recipes[numMeal]}
                          handleLinks={(false)}
                          handleLikes={(false)}
                        />
                        <button className="keepBut" onClick={keepMeal}>Keep</button>
                      </> :
                      ""}
                    </> : 
                    ""
          }
        </Popup>

        <Popup trigger={mealPlanPopup} setTrigger={setMealPlanPopup}>
          <h3 className="mealPlanHead">You did it! (almost)</h3>
          {/* {mapMealPlan()} */}
          <div className="mealPlan">
          {titles.length > 0
          ? titles.map((element, idx) => (
            <div className="mod-box">
              <RecipeCard
                user={user}
                recipeInfo={recipes[idx]}
                handleLinks={(false)}
                handleLikes={(false)}
              />
              {/* {times[idx]} {meals[idx]} {titles[idx]} <img src={images[idx]}></img> {preps[idx]} {ratings[idx]} */}
            </div>
          ))
          : null}
          </div>
          <button className="keepBut" onClick={logMealPlan}>Keep Meal</button>
        </Popup>
      </div>
      )}
    </div>
  )
}