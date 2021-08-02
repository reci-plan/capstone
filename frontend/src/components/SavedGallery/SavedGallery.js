import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./SavedGallery.css"

export default function SavedGallery({ user, saved, handleSave, handleUnsave }) {
    return (
        <div className="SavedGallery">
            <div className="section-title"> Saved Recipes</div>
            <div className="filter-display">
            {saved ?
                saved.map((s) => (
                    <RecipeCard
                        key={s.id}
                        user={user}
                        recipeInfo={s}
                        handleSave={handleSave}
                        handleUnsave={handleUnsave}
                    />
                )) : null
            }
             </div>
        </div>
    );
}
