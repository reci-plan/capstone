import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";

import "./SavedGallery.css";

export default function SavedGallery({ user, saved, savePlan, mealPlanInfo, handleSave, handleUnsave, handleUnsavePlan }) {
    const [likes, setLikes] = useState(true);

    const handleOnClick = () => {
        if (user?.email) {
          if (likes) {
            handleUnsavePlan(savePlan);
            setLikes(false);
          } else {
            setLikes(true);
          }
        }
      };

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
            {/* {console.log("SAVE PLAN", savePlan, "M PLAN INFO", mealPlanInfo, "EX: ", mealPlanInfo[0][0])} */}
                {savePlan ?
                    savePlan.map((s, i) => (
                        <div className="mealPlan saveRow">
                        {s.map((meal, j) => (
                            typeof mealPlanInfo[i] != 'undefined' ?
                            <RecipeCard
                                key={meal.id}
                                user={user}
                                recipeInfo={meal}
                                meal={mealPlanInfo[i][j]}
                                handleSave={handleSave}
                                handleUnsave={handleUnsave}
                                handleLinks={(true)}
                                handleLikes={(false)}
                                handleMealInfo={(true)}
                            />
                            : ""
                        ))}

                        {likes ?
                            <>
                            <button
                                className="save-btn"
                                onClick={handleOnClick}
                            >
                                {saved ? (
                                <img src={heartFill} alt="Solid Heart to unsave recipe"></img>
                                ) : (
                                <img src={heart} alt="Heart to save recipe"></img>
                                )}
                            </button>
                            </>
                            : ""
                        }
                        </div>
                    )) : null
                    }
            </div>
        </div>
        </div>
    );
}
