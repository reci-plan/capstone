import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import home from "../../assets/home.png";
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";
import CarouselDisplay from "../CarouselDisplay/CarouselDisplay";
import apiClient from "../../services/apiClient";

export default function Home({ user }) {
    const [recipes, setRecipes] = useState([]);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [sortby, setSortby] = useState("price");

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchAllRecipes();
            if (data) {
                console.log(data.recipes);
                setRecipes(data.recipes);
            }
            if (error) {
                console.log(error);
            }
        };
        fetchRecipes();
    }, []);

    const toggleSortbyBtn = () => setDropdownIsOpen(!dropdownIsOpen);

    const handleSortbyChange = (v) => {
        setSortby(v);
        toggleSortbyBtn();
    };

    return (
        <div className="Home" style={{ backgroundImage: `url(${home})` }}>
            <div className="home-header">
                {user.email ? (
                    <div>
                        Welcome to Reciplan, {user.first_name} {user.last_name}
                    </div>
                ) : (
                    <div>
                        Welcome to Reciplan!
                    </div>
                )}
            </div>

            <button className="sortby-btn" onClick={toggleSortbyBtn}>
                Sort by {dropdownIsOpen ? <>&#9652;</> : <>&#9662;</>}
            </button>
            {dropdownIsOpen ? (
                <div className="sortby-dropdown">
                    <button onClick={() => handleSortbyChange("price")}>
                        Price
                    </button>
                    <button onClick={() => handleSortbyChange("time")}>
                        Time
                    </button>
                    <button onClick={() => handleSortbyChange("rating")}>
                        Rating
                    </button>
                </div>
            ) : null}

            {sortby === "price" ? (
                <>
                    <div className="category-header">Under $30</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"expense"}
                        rangeA={0}
                        rangeB={30}
                    />

                    <div className="category-header">Under $40</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"expense"}
                        rangeA={30}
                        rangeB={40}
                    />
                </>
            ) : null}

            {sortby === "time" ? (
                <>
                    <div className="category-header">Under 10 min</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"prep_time"}
                        rangeA={0}
                        rangeB={10}
                    />

                    <div className="category-header">Under 20 min</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"prep_time"}
                        rangeA={10}
                        rangeB={20}
                    />

                    <div className="category-header">Under 30 min</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"prep_time"}
                        rangeA={20}
                        rangeB={30}
                    />

                    <div className="category-header">Under 40 min</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        type={"prep_time"}
                        rangeA={30}
                        rangeB={40}
                    />
                </>
            ) : null}

            {sortby === "rating" ? (
                <>
                    <div className="category-header">Over 80 points</div>
                    <CarouselDisplay
                        recipes={recipes}
                        type={"rating"}
                        rangeA={80}
                        rangeB={101}
                    />

                    <div className="category-header">Over 60 points</div>
                    <CarouselDisplay
                        recipes={recipes}
                        type={"rating"}
                        rangeA={60}
                        rangeB={80}
                    />

                    <div className="category-header">Over 40 points</div>
                    <CarouselDisplay
                        recipes={recipes}
                        type={"rating"}
                        rangeA={40}
                        rangeB={60}
                    />
                </>
            ) : null}
            {/* <DisplayAllRecipes user={user} /> */}
        </div>
    );
}
