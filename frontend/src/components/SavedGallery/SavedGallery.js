import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";
import MealPlan from "../MealPlan/MealPlan";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";

import "./SavedGallery.css";

export default function SavedGallery({ user, saved, savePlan, mealPlanInfo, mealPlanIds, handleSave, handleUnsave, handleUnsavePlan }) {

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
            {/* {console.log("SAVE PLAN", savePlan, "M PLAN INFO", mealPlanInfo, "EX: ", mealPlanInfo[0][0])} */}
                {savePlan ?
                    savePlan.map((s, i) => (
                        <div className="saveRow">
                            <div className={mealPlanIds[i]}>
                                    <MealPlan
                                    key={s.id}
                                    user={user}
                                    mealPlanInfo={mealPlanInfo[i]}
                                    
                                    plan={s}
                                    handleSave={handleSave}
                                    handleUnsave={handleUnsave}
                                    handleUnsavePlan={handleUnsavePlan}
                                    mealPlanId={mealPlanIds[i]}
                                    handleLinks={(true)}
                                    handleLikes={(false)}
                                    handleMealInfo={(true)}
                                    />
                            </div>
                        </div>
                    )) : null
                    }
            </div>
        </div>
    );
}
