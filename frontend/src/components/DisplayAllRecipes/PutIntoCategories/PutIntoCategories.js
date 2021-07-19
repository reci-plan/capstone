import { useState, useEffect } from "react";
import RecipeCard from "../../RecipeCard/RecipeCard";
import { useDataLayerValue } from "../../../context/DataLayer";

import "./PutIntoCategories.css";
export default function PutIntoCategories({
    recipes,
    rangeA,
    rangeB,
    user,
    handleClickOnSave,
}) {
    const [{ colors, test }, dispatch] = useDataLayerValue();

    useEffect(() => {
        dispatch({ type: "SET_COLORS", colors: [1, 2, 3, 4, 5] });
    }, []);

    return (
        <div className="PutIntoCategories">
            {recipes
                .filter((r) => r.prep_time >= rangeA && r.prep_time <= rangeB)
                .sort((a, b) => a.prep_time - b.prep_time)
                .slice(0, 25)
                .map((r) => (
                    <RecipeCard
                        user={user}
                        recipeInfo={r}
                        handleClick={handleClickOnSave}
                    />
                    // {user?.email && (
                    //     <button onClick={() => handleClick(r)}>save</button>
                    // )}
                ))}
        </div>
    );
}
