import apiClient from "../../services/apiClient";
import { useState, useEffect } from "react";

export default function DisplayAllRecipes() {
    const [recipes, setRecipes] = useState([]);

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
            {recipes.map((r) => (
                <p>
                    id: {r.id}, title: {r.title}, categories:
                    {fixObj(r.category[0])}
                </p>
            ))}
        </div>
    );
}
