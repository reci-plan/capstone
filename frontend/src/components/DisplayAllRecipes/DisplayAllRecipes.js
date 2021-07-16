import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";

import PutIntoCategories from "./PutIntoCategories/PutIntoCategories";

import { useDataLayerValue } from "../../context/DataLayer";

import './DisplayAllRecipes.css'

export default function DisplayAllRecipes({ user }) {
    // const [recipes, setRecipes] = useState([]);
    // const [minutes, setMinutes] = useState(45);

    const [{ recipes }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchAllRecipes();

            if (data) {
                console.log(data.recipes);

                dispatch({ type: "SET_GLOBAL_RECIPES", recipes: data.recipes });
            }

            if (error) {
                alert(error.message);
            }
        };
        fetchRecipes();
    }, []);

    const fixObj = (categories_obj) => {
        const arr = [];
        categories_obj = JSON.parse(categories_obj);
        for (const category in categories_obj) {
            // this is the value at the current category
            if (categories_obj[category]) {
                arr.push(category);
            }
        }
        return arr.join(", ");
    };

    return (
        <div className="DisplayAllRecipes">
            <div className="display-section">
                <div className="display-title">Under 10 minutes</div>
                <PutIntoCategories user={user} recipes={recipes} rangeA={0} rangeB={10} />
            </div>
            <div className="display-section">
                <div className="display-title">Under 20 minutes</div>
                <PutIntoCategories user={user} recipes={recipes} rangeA={11} rangeB={20} />
            </div>
            <div className="display-section">
                <div className="display-title">Under 30 minutes</div>
                <PutIntoCategories user={user} recipes={recipes} rangeA={21} rangeB={30} />
            </div>
            <div className="display-section">
                <div className="display-title">Under 45 minutes</div>
                <PutIntoCategories user={user} recipes={recipes} rangeA={31} rangeB={45} />
            </div>
        </div>
    );
}
