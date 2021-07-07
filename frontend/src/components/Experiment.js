import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Experiment() {
    const [searchFoods, setSearchFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(searchTerm);
        await searchFoodFunction();
    };

    const searchFoodFunction = async () => {
        const res = await axios(
            `http://localhost:3001/recipes/search/${searchTerm}`
        );
        console.log(res.data);
        // console.log(res.data.results.results);
        // setSearchFoods((prevState) => [...prevState, res.data.results.results]);
        setSearchFoods(res.data.results.results);
    };

    console.log(searchFoods);

    return (
        <div>
            Experiment
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        food:
                        <input
                            name="search"
                            type="text"
                            onChange={handleOnChange}
                            value={searchTerm}
                        />
                    </label>
                    <button> search </button>
                </form>
            </div>
            {searchFoods.map((food) => (
                <p>
                    {food.title} - ID: {food.id}
                </p>
            ))}
        </div>
    );
}
