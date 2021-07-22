import React, { useState } from 'react';
import './Menu.css'
import { TextField } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import apiClient from "../../services/apiClient";

import pencil from '../../assets/pencil.svg'

var selectedCategories = []

var userValues = [];
var userTime = "";
var userMeal = "";
var userCategories = [];

//Pass elements into popup with props.children
export default function Menu(props) {
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

    const [options] = useState(data)
    const [submitIsVisible, setSubmitIsVisible] = useState(false)

    const handleOpenButton = () => {
        setSubmitIsVisible(true)
    }
    
    const handleCloseButton = () => {
        setSubmitIsVisible(false)
    }

    const handleButton = () => {
        console.log(document.getElementById('time').value)
        console.log((document.getElementById('meal-name').value))
        console.log(selectedCategories)
        if ((document.getElementById('time').value !== "") && (document.getElementById('meal-name').value !== "") && (selectedCategories.length !== 0)) {
            console.log("ALL FIELDS COMPLETE")
            handleOpenButton();
        }
        else {
            handleCloseButton();
        }
    }

    const onSelect = (data) => {
        selectedCategories = data;
        console.log(selectedCategories)
    }

    const returnValues = async () => {
        var categoryCode = 0;
        userTime = document.getElementById('time').value;
        userMeal =document.getElementById('meal-name').value;
        userCategories = selectedCategories;
        userCategories.forEach(element => {
            console.log(element.option)
        })

        userCategories.forEach(element => {
            categoryCode |= 1<<(element.option);
        })
        
        console.log("Cat", categoryCode)

        const { data, err } = await apiClient.fetchRecipesByCategory(categoryCode);

        if (data) {
            console.log(data)
        }
        //return userValues;
        
        userValues = [userTime, userMeal, data.recipes]
        console.log("HERE ARE THE VALUES", userValues)

        //load wheel with options
        console.log(userValues[2])
        return userValues[2];
    }

    return (
        <div className="menu">
            
            <div className="menuLine">
                <p>Time to eat: </p>
                <div className="userInput"><TextField type="time" id="time" onChange={(handleButton)}></TextField></div>
            </div>
            <div className="menuLine">
                <p>Meal Name: </p>
                <div className="fake-input menu-input">
                    <input type="text" id="meal-name" required placeholder="Ex: Breakfast, lunch..." onChange={(handleButton)} onClick={(handleButton)}></input>
                    <img src={pencil} width="25" alt="Edit your plan name"></img>
                </div>
            </div>
            <div className="menuLine">
                <p>Categories: </p>
                <div onClick={(handleButton)}><div className="setWidth"><Multiselect options={data} displayValue={"Category"} onSelect={onSelect} id="category"></Multiselect></div></div>
            </div>
            
            {submitIsVisible ?
                <>
                <div className="submit-but" onClick={props.data}><div onClick={props.passToParent(returnValues)}><button onClick={props.onClick2}>Submit</button></div></div>
                </> : 
                ""
            }

        </div>
    )
}