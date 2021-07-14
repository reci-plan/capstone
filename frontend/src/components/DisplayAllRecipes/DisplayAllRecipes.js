import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";

import PutIntoCategories from "./PutIntoCategories/PutIntoCategories";

export default function DisplayAllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [minutes, setMinutes] = useState(45);

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchAllRecipes();

            if (data) {
                console.log(data.recipes);
                setRecipes(data.recipes);
            }

            if (error) {
                alert(error.message);
            }
        };
        fetchRecipes();
    }, []);

    console.log(recipes);

    const fixObj = (categories_obj) => {
        const arr = [];
        categories_obj = JSON.parse(categories_obj);
        for (const category in categories_obj) {
            // this is the value at the current category
            if (categories_obj[category]) {
                arr.push(category);
            }
        }
        return arr.join(", ");
    };

    return (
        <div>
            <h2> DisplayAllRecipes component </h2>
            {/*     <button onClick={() => setMinutes(10)}> 10 Minutes </button>
            <button onClick={() => setMinutes(20)}> 20 Minutes </button>
            <button onClick={() => setMinutes(30)}> 30 Minutes </button>
            <button onClick={() => setMinutes(45)}> 45 Minutes </button>*/}
            <div>
                <div style={{ border: "1px solid black" }}>
                    less than 10 minutes recipes
                </div>
                <PutIntoCategories recipes={recipes} rangeA={0} rangeB={10} />
            </div>
            <div>
                <div style={{ border: "1px solid black" }}>
                    less than 20 minutes recipes
                </div>
                <PutIntoCategories recipes={recipes} rangeA={11} rangeB={20} />
            </div>
            <div>
                <div style={{ border: "1px solid black" }}>
                    less than 30 minutes recipes
                </div>
                <PutIntoCategories recipes={recipes} rangeA={21} rangeB={30} />
            </div>{" "}
            <div>
                <div style={{ border: "1px solid black" }}>
                    less than 45 minutes recipes
                </div>
                <PutIntoCategories recipes={recipes} rangeA={31} rangeB={45} />
            </div>
        </div>
    );
}
