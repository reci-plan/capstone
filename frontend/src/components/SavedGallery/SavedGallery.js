
import RecipeCard from "../RecipeCard/RecipeCard";
import MealPlan from "../MealPlan/MealPlan";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";
import navbar from "../../assets/navbar.jpg"

import "./SavedGallery.css";

export default function SavedGallery({ user, saved, savePlan, mealPlanInfo, mealPlanIds, handleSave, handleUnsave, handleUnsavePlan }) {

    return (
        <div className="SavedGallery" style={{backgroundImage: `url(${navbar})`}}>
            <div className="section-title">Saved Recipes</div>
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
            <h3> Saved Meal Plans </h3>
            {/* {console.log("SAVE PLAN", savePlan, "M PLAN INFO", mealPlanInfo, "EX: ", mealPlanInfo[0][0])} */}
                {savePlan ?
                    savePlan.map((s, i) => (
                        <div className="saveRow">
                            
                        {console.log("SI", savePlan,s, i)}
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
    );
}
