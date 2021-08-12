import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";

import "./MealPlan.css";

export default function MealPlan({ user, mealPlanInfo, plan, mealPlanId, handleSave, handleUnsave, handleUnsavePlan }) {
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        const checkPlan = async () => {
          const { data, error } = await apiClient.fetchSavedMealPlan(mealPlanId);
          if (data) {
            setSaved(data);
          }
    
          if (error) {
            console.log("Check saved recipe error.......RecipeCard.js");
          }
        };
    
        checkPlan();
      }, [mealPlanId]);

    const handleOnClick = async () => {
        console.log("CLICK ID", mealPlanId)
        if (user?.email) {
          if (saved) {
            handleUnsavePlan(mealPlanId);
            setSaved(false);
          } else {
            setSaved(true);
          }
        }
      };

    return (
        <div className="MealPlan">
            {console.log("MP INFO", plan, mealPlanInfo)}
              <div className="mr">
                {mealPlanInfo ?
                    
                  <div className="plan-title">{mealPlanInfo[0][2]}</div> :
                  ""
                }
                <button
                    className="save-btn"
                    onClick={handleOnClick}
                >
                    {saved ? (
                    <img src={heartFill} alt="Solid Heart to unsave meal plan"></img>
                    ) : (
                    <img src={heart} alt="Heart to save meal plan"></img>
                    )}
                </button>
                </div>
                <div className="meals">
                {mealPlanInfo ?
                    plan.map((meal, j) => (
                        typeof plan[j] != 'undefined' ?
                        <RecipeCard
                            key={meal.id}
                            user={user}
                            recipeInfo={meal}
                            meal={mealPlanInfo[j]}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                            handleLinks={(true)}
                            handleLikes={(false)}
                            handleMealInfo={(true)}
                        />
                        : ""
                    )) : null
                }
                </div>
                <>
                </>     
            </div>
    );
}
