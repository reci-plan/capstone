import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./SavedGallery.css";

export default function SavedGallery({ user, saved, savePlan, handleSave, handleUnsave }) {
    return (
        <div className="SavedGallery">
            {console.log("SAVED", saved)}
            <div className="saveCol">
            <h3> Saved Recipes </h3>
            <div className="saveRow">
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
            <h3> Saved Meal Plans </h3>
            <div className="saveRow">
            {console.log("SAVE PLAN", savePlan)}
                {savePlan ?
                    savePlan.map((s) => (
                        <div className="mealPlan saveRow">
                        {s.map((meal) => (
                            <RecipeCard
                                key={meal.id}
                                user={user}
                                recipeInfo={meal}
                                handleSave={handleSave}
                                handleUnsave={handleUnsave}
                                handleLinks={(true)}
                                handleLikes={(false)}
                            />
                        ))}
                        </div>
                    )) : null
                    }
            </div>
        </div>
        </div>
    );
}
