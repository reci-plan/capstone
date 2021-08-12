import React, { useEffect, useState } from 'react';
import './Menu.css'
import { TextField } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import apiClient from "../../services/apiClient";

import pencil from '../../assets/pencil.svg'

// var selectedCategories = []

// var userValues = [];
// var userTime = "";
// var userMeal = "";
// var userCategories = [];

//Pass elements into popup with props.children
export default function Menu({props, dummyLoadWheel, handleCloseForm, setSpinIsVisible}) {
    const data = [
        {Category: 'Vegetarian', id:0},
        {Category: 'Vegan', id:1},
        {Category: 'Gluten Free', id:2},
        {Category: 'Dairy Free', id:3},
        {Category: 'Breakfast', id:4},
        {Category: 'Main Course', id:5},
        {Category: 'Side Dish', id:6},
        {Category: 'Salad', id:7},
        {Category: 'Appetizer', id:8},
        {Category: 'Soup', id:9},
        {Category: 'Finger Food', id:10},
        {Category: 'Drink', id:11}
    ]

    //Array of objects (category and id)
    const [selectedCategories, setSelectedCategories] = useState(null)
    const [recipeResults, setRecipeResults] = useState(null)
    const [userTime, setUserTime] = useState(null)
    const [userMeal, setUserMeal] = useState(null)
    const [userData, setUserData] = useState([])
    const [options, setOptions] = useState(data)
    const [submitIsVisible, setSubmitIsVisible] = useState(false)

    //State starts at null. On first render, do nothing.
    // const [myState, setMyState] = useState(null)
    // useEffect(() => {
    //     if (myState === null) {
    //         return
    //     }
    //     passToParent(myState)
    // }, [myState])
    // const handleThisClick = () => setMyState(['eggs', 'coffee'])

    //Use effect handles submit
    useEffect(() => {
        if ((selectedCategories !== null) && (userTime !== null) && (userMeal !== null) && (recipeResults !== null) && (recipeResults !== "")) {
            if ((selectedCategories.length) !== 0 && (recipeResults.length !== 0) && (userMeal !== "") ) {
                setSubmitIsVisible(true)
                console.log("SUBMIT TRUE", selectedCategories, userTime, userMeal, recipeResults)
            }
            else {
                setSubmitIsVisible(false)
            }
        }
        else {
            setSubmitIsVisible(false)
            console.log("SUBMIT FALSE", selectedCategories, userTime, userMeal, recipeResults)
        }
    }, [submitIsVisible, selectedCategories, userTime, userMeal, recipeResults])

    //On select, set selected categories to data.
    const onSelect = async (e) => {
        if (e !== null) {
            console.log("SELECTED CATEGORIES:", e)
            setSelectedCategories(e)
            var categoryCode = 0;
            // setUserTime(document.getElementById('time').value);
            // setUserMeal(document.getElementById('meal-name').value);
            e.forEach(element => {
                console.log("MY CAT", element, element.id)
            })
    
            //Iterate over selected categories (array of objects, each with a category and id). {Ex: Category: Veggie, id: 0}
            //and set the category code bit at that index.
            e.forEach(element => {
                categoryCode |= 1<<(11 - element.id);
            })
            
            console.log("Cat", categoryCode)
    
            const { data, err } = await apiClient.fetchRecipesByCategory(categoryCode);
    
            if (data) {
                console.log("Fetched set of recipes:", data)
                if (data.recipes.rows.length !== 0) {
                    setRecipeResults(data.recipes.rows)
                    console.log("Attempt", data.recipes.rows)
                }
                else {
                    setRecipeResults(null)
                }
            }
        }
    }
    console.log(recipeResults)

    const handleTime = (e) => {
        if (e !== null) {     
            (setUserTime(document.getElementById('time').value))
        }
    }

    const handleMeal = (e) => {
        if (e !== null) {     
            (setUserMeal(document.getElementById('meal-name').value))
        }
    }

    // const handleOpenButton = () => {
    //     setSubmitIsVisible(true)
    // }
    
    // const handleCloseButton = () => {
    //     setSubmitIsVisible(false)
    // }

    // const handleButton = (e) => {
    //     console.log("TARGETED VALUE", e.target.value, "TIME", document.getElementById('time').value, "MEAL NAME", document.getElementById('meal-name').value.Category, "SELECTED CATEGORIES", selectedCategories);
    //     if ((document.getElementById('time').value !== "") && (document.getElementById('meal-name').value !== "") && (selectedCategories.length !== 0)) {
    //         console.log("ALL FIELDS COMPLETE")
    //         handleOpenButton();
    //     }
    //     else {
    //         handleCloseButton();
    //     }
    // }

    //Called after selecting a category
    // const onSelect = (data) => {
    //     console.log("CALLED ON SELECT. HERE ARE THE CATEGORIES:", selectedCategories)
    //     setSelectedCategories(data);
    // }

    //returns an array of [time, mealName, pssible recipes].
    //Set the state of each array. Then have the use effect check and make setSubmit t or f.
    const returnValues = async () => {
        console.log("RETURNING TIME (STATES)", userTime, "SELECTED CATEGORIES", selectedCategories)
        var categoryCode = 0;
        // setUserTime(document.getElementById('time').value);
        // setUserMeal(document.getElementById('meal-name').value);
        selectedCategories.forEach(element => {
            console.log("MY CAT", element, element.id)
        })

        //Iterate over selected categories (array of objects, each with a category and id). {Ex: Category: Veggie, id: 0}
        //and set the category code bit at that index.
        selectedCategories.forEach(element => {
            categoryCode |= 1<<(11 - element.id);
        })
        
        console.log("Cat", categoryCode)

        const { data, err } = await apiClient.fetchRecipesByCategory(categoryCode);

        if (data) {
            console.log("Fetched set of recipes:", data)
        }
        
        //Set uservalues to an array with the time, meal, and potential recipes to be loaded to wheel.
        setUserData([userTime, userMeal, data.recipes])
        var x = [userTime, userMeal, data.recipes];
        console.log("HERE ARE THE VALUES", userData)
        
        console.log("HERE ARE THE VALUES 2", [userTime, userMeal, userData])

        //load wheel with options
        console.log(userData)
        // setUserTime(userData[0])
        // setUserMeal(userData[1])
        console.log("USER VALS.ROWS", x[2].rows.length)
        // if (userValues[2].rows.length === 0) {
        //     setSubmitIsVisible(false)
        // }
        //setUserData(user)
        dummyLoadWheel([userTime, userMeal, data.recipes])
        handleCloseForm()
        setSpinIsVisible(true)
    }

    
    console.log("HERE ARE THE VALUES", userData, userTime, userMeal)
    
    return (
        <div className="menu">
            
            <div className="menuLine">
                <p>Time to eat: </p>
                <div className="box fake-input userInput"><input type="time" id="time" onChange={(handleTime)}/></div>
            </div>
            <div className="menuLine">
                <p>Meal Name: </p>
                <div className="fake-input menu-input">
                    <input type="text" id="meal-name" required placeholder="Breakfast, lunch..." onChange={handleMeal}></input>
                    <img src={pencil} width="25" alt="Edit your plan name"></img>
                </div>
            </div>
            <div className="menuLine">
                <p>Categories: </p>
                <div className=""><Multiselect options={data} displayValue={"Category"} onSelect={onSelect} id="category"></Multiselect></div>
            </div>
            
            {submitIsVisible ?
                <>
                <div className="submit-but" onClick={{props}.data}><div onClick={returnValues}><button onClick={{props}.onClick2}>Submit</button></div></div>
                </> : 
                ""
            }

        </div>
    )
}