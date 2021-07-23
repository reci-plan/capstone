import { useState, useEffect } from "react";
import RecipeCard from "../../RecipeCard/RecipeCard";
import { useDataLayerValue } from "../../../context/DataLayer";
import apiClient from '../../../services/apiClient'


import "./PutIntoCategories.css";
export default function PutIntoCategories({
    recipes,
    rangeA,
    rangeB,
    user
}) {
    const [{ colors, test }, dispatch] = useDataLayerValue();

    useEffect(() => {
        dispatch({ type: "SET_COLORS", colors: [1, 2, 3, 4, 5] });
    }, []);

    // console.log(colors);

    const handleSave = async (r) => {
        const { data, error } = await apiClient.saveRecipe(r);

        if (data) {
            console.log("Save: ", data);
        }

        if (error) {
            alert(error);
        }
    };

    const handleUnsave = async (r) => {
        const { data, error } = await apiClient.unsaveRecipe(r);

        if (data) {
            console.log("Unsave: ", data);
        }

        if (error) {
            alert(error);
        }
    };

    return (
        <div className="PutIntoCategories">
            {recipes
                .filter((r) => r.prep_time >= rangeA && r.prep_time <= rangeB)
                .sort((a, b) => a.prep_time - b.prep_time)
                .slice(0, 25)
                .map((r) => (
                    <RecipeCard user={user} recipeInfo={r} handleSave={handleSave} handleUnsave={handleUnsave}/>
                ))}
        </div>
    );
}
