import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";

export default function PutIntoCategories({ recipes, rangeA, rangeB, user }) {
    const handleClick = async (r) => {
        const { data, error } = await apiClient.saveRecipe(r);
        if (data) {
            console.log("hi");
        }

        if (error) {
            alert(error);
        }
    };

    return (
        <>
            {recipes
                .filter((r) => r.prep_time >= rangeA && r.prep_time <= rangeB)
                .sort((a, b) => a.prep_time - b.prep_time)
                .slice(0, 25)
                .map((r) => (
                    <p>
                        {r.title}, {r.prep_time}
                        {user?.email && (
                            <button onClick={() => handleClick(r)}>save</button>
                        )}
                    </p>
                ))}
        </>
    );
}
