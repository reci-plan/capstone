import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";

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
            <button onClick={() => setMinutes(10)}> 10 Minutes </button>
            <button onClick={() => setMinutes(20)}> 20 Minutes </button>
            <button onClick={() => setMinutes(30)}> 30 Minutes </button>
            <button onClick={() => setMinutes(45)}> 45 Minutes </button>
            {/*{recipes.map((r) => (
                <p>
                    id: {r.id}, title: {r.title}, categories:
                    {fixObj(r.category[0])}, prepTime: {r.prep_time}
                </p>
            ))}*/}
            {recipes
                .filter((r) => r.prep_time <= minutes)
                .sort((a, b) => a.prep_time - b.prep_time)
                .map((r) => (
                    <p>
                        {r.title}, {r.prep_time}{" "}
                    </p>
                ))}
        </div>
    );
}
