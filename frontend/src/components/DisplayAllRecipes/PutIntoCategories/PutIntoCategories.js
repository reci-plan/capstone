import { useState, useEffect } from "react";
import RecipeCard from "../../RecipeCard/RecipeCard";

import './PutIntoCategories.css'
export default function PutIntoCategories({ recipes, rangeA, rangeB }) {
    return (
        <div className="PutIntoCategories">
            {recipes
                .filter((r) => r.prep_time >= rangeA && r.prep_time <= rangeB)
                .sort((a, b) => a.prep_time - b.prep_time)
                .slice(0, 25)
                .map((r) => (
                    <RecipeCard recipeInfo={r} />
                ))}
        </div>
    );
}
