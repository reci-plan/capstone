import { useState } from 'react';
import './Wheel.css'
import { Wheel } from 'react-custom-roulette'
import Popup from '../Popup/Popup'
import Menu from '../Menu/Menu'
import apiClient from "../../services/apiClient";
import RenderBox from "../RenderBox/renderBox";

import pencil from '../../assets/pencil.svg'

var times = [''];
var meals = [''];
var recIds = [-1];

var titles = [''];
var images = [''];
var preps = [''];
var ratings = [''];
var numMeal = 0;
var dum = -1;

export default function Generator() {

  const [wheelIsVisible, setWheelIsVisible] = useState(true)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  //for recipe popup
  const [buttonPopup, setButtonPopup] = useState(false);
  //for meal plan popup
  const [mealPlanPopup, setMealPlanPopup] = useState(false);
  const [spinIsVisible, setSpinIsVisible] = useState(false);
  const [boxVals, setBoxVals] = useState(-1)
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
      
      images[numMeal] = data.recipe.image_url;
      preps[numMeal] = data.recipe.prep_time;
      ratings[numMeal] = data.recipe.rating;

      var tempAr = [titles[numMeal], images[numMeal], preps[numMeal], ratings[numMeal]]

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
    }
  }

  const mealIn = (i) => {
    return (
      <div>
        <p>{titles[i]}</p>
        <p>{images[i]}</p>
        <p>{preps[i]}</p>
        <p>{ratings[i]}</p>
      </div>
    )
  }

  const mapMealPlan = () => {
    for (let i = 0; i < titles.length; i++) {
      var x = mealIn(i)
      console.log("PRP",x.props.children)
      console.log(mealIn(i))
      //return [titles, images, preps, ratings];
    }
  }

  return (
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
                          {console.log("DATA TTLE",data.title)}
                          </> : 
                          ""
                    }
                    {}
                    <h3>{titles[numMeal]}</h3>
                    <br></br>
                    <img src={images[numMeal]} alt={titles[numMeal]}></img>
                    <br></br>
                    <p>Prep Time: {preps[numMeal]} minutes</p>
                    <br></br>
                    <p>Rating: {ratings[numMeal]} stars</p>
                    <button className="keepBut" onClick={keepMeal}>Keep (Coming soon!)</button>
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
            <div className="holdMeal">
              {times[idx]} {meals[idx]} {titles[idx]} <img src={images[idx]} alt={titles[idx]}></img> {preps[idx]} {ratings[idx]}
            </div>
          ))
          : null}
        </div>
        {/* <div className="mealPlan">
          <div className="holdMeal">
            <div>{times[0]}</div>
            <div>{meals[0]}</div>
            <div>{titles[0]}</div>
            <img src={images[0]}></img>
            <div>{preps[0]}</div>
            <div>{ratings[0]}</div>
          </div>
          <div className="holdMeal">
            <div>{times[1]}</div>
            <div>{meals[1]}</div>
            <div>{titles[1]}</div>
            <img src={images[1]}></img>
            <div>{preps[1]}</div>
            <div>{ratings[1]}</div>
          </div>
          <div className="holdMeal">
            <div>{times[2]}</div>
            <div>{meals[2]}</div>
            <div>{titles[2]}</div>
            <img src={images[2]}></img>
            <div>{preps[2]}</div>
            <div>{ratings[2]}</div>
          </div>
          <div className="holdMeal">
            <div>{times[3]}</div>
            <div>{meals[3]}</div>
            <div>{titles[3]}</div>
            <img src={images[3]}></img>
            <div>{preps[3]}</div>
            <div>{ratings[3]}</div>
          </div>
        </div>*/}
        <button className="keepBut" onClick={logMealPlan}>Keep Meal</button>
      </Popup>

    </div>
  )
}