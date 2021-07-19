import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";

import PutIntoCategories from "./PutIntoCategories/PutIntoCategories";

import { useDataLayerValue } from "../../context/DataLayer";

import "./DisplayAllRecipes.css";

export default function DisplayAllRecipes({
    user,
    recipes,
    handleClickOnSave,
}) {
    // const [recipes, setRecipes] = useState([]);
    // const [minutes, setMinutes] = useState(45);

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
                <PutIntoCategories
                    user={user}
                    recipes={recipes}
                    rangeA={0}
                    rangeB={10}
                    handleClickOnSave={handleClickOnSave}
                />
            </div>
            <div className="display-section">
                <div className="display-title">Under 20 minutes</div>
                <PutIntoCategories
                    user={user}
                    recipes={recipes}
                    rangeA={11}
                    rangeB={20}
                    handleClickOnSave={handleClickOnSave}
                />
            </div>
            <div className="display-section">
                <div className="display-title">Under 30 minutes</div>
                <PutIntoCategories
                    user={user}
                    recipes={recipes}
                    rangeA={21}
                    rangeB={30}
                    handleClickOnSave={handleClickOnSave}
                />
            </div>
            <div className="display-section">
                <div className="display-title">Under 45 minutes</div>
                <PutIntoCategories
                    user={user}
                    recipes={recipes}
                    rangeA={31}
                    rangeB={45}
                    handleClickOnSave={handleClickOnSave}
                />
            </div>
        </div>
    );
}
