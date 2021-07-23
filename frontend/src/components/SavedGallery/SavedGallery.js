import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./SavedGallery.css"

export default function SavedGallery({ user, handleSave, handleUnsave }) {
    const [saved, setSaved] = useState([]);
    const [unSave, setUnsave] = useState(false)
    const [errors, setErrors] = useState("");
    console.log(user)

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchSavedRecipes();
            if (data) {
                console.log(data.savedRecipes)
                setSaved(data.savedRecipes);
            }
    
            if (error) {
                console.log(error, "fetch saved recipes")
            }
        };
        fetchRecipes();
    }, [user, unSave]);

    const handleUnsaveRemove = (r) => {
        setUnsave(!unSave)
        handleUnsave(r)
    }

    return (
        <div className="SavedGallery">
            <h3> Saved Recipes </h3>
            {saved.map((s) => (
                <>
                    <RecipeCard
                        user={user}
                        recipeInfo={s}
                        handleSave={handleSave}
                        handleUnsave={handleUnsaveRemove}
                    />
                    {/* <button onClick={() => handleDelete(s)}> delete </button> */}
                </>
            ))}
        </div>
    );
}
