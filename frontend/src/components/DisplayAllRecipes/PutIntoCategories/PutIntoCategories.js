import { useState, useEffect } from "react";

export default function PutIntoCategories({ recipes, rangeA, rangeB }) {
    return (
        <>
            {recipes
                .filter((r) => r.prep_time >= rangeA && r.prep_time <= rangeB)
                .sort((a, b) => a.prep_time - b.prep_time)
                .slice(0, 25)
                .map((r) => (
                    <p>
                        {r.title}, {r.prep_time} <button> save </button>
                    </p>
                ))}
        </>
    );
}
