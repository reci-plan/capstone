import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import home from "../../assets/home.png";
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";
import CarouselDisplay from "../CarouselDisplay/CarouselDisplay";
import apiClient from "../../services/apiClient";

export default function Home({ user, handleSave, handleUnsave }) {
    const [recipes, setRecipes] = useState([]);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [displayByRec, setDisplayByRec] = useState(true)
    const [sortby, setSortby] = useState("price");
    const [bitValue, setBitValue] = useState(0);

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

    const toggleRecBtn = () => {
        setDisplayByRec(true)
        setDropdownIsOpen(false);
    }
    
    const toggleSortbyBtn = () => {
        setDropdownIsOpen(!dropdownIsOpen);
        setDisplayByRec(false)
    }

    const handleSortbyChange = (v) => {
        setSortby(v);
        setDropdownIsOpen(false);
    };

    const getGreeting = () => {
        var today = new Date();
        var curHr = today.getHours();

        if (curHr < 12) {
            // setTheCurrentTime("morning");
            return "Good Morning";
        } else if (curHr < 18) {
            // setTheCurrentTime("afternoon");
            return "Good Afternoon";
        } else {
            // setTheCurrentTime("evening");
            return "Good Evening";
        }
    };

    useEffect(() => {
        const time = getGreeting();

        // Main course || side dish || salad || appetizer || soup 
        const meals = [64, 32, 16, 8, 4]
        if (time === "Good Morning") {
            // breakfast
            setBitValue(128)
        } else if (time === "Good Afternoon") {
            setBitValue(meals[Math.floor(Math.random() * meals.length)]);
        } else {
            setBitValue(meals[Math.floor(Math.random() * meals.length)]);
        }
    }, []);

    return (
        <div className="Home" style={{ backgroundImage: `url(${home})` }}>
            <div className="home-header">
                {user.email ? (
                    <div>
                        {getGreeting()}, {user.first_name} {user.last_name}!
                    </div>
                ) : (
                    <div>
                        Welcome to Reciplan!
                    </div>
                )}
            </div>

            <div className="btn-display">
                <button className="rec-btn" onClick={toggleRecBtn}>
                    Recommendations
                </button>
                <div>
                    <button className="sortby-btn" onClick={toggleSortbyBtn}>
                        Sort by {dropdownIsOpen ? <>&#9652;</> : <>&#9662;</>}
                    </button>
                    {dropdownIsOpen ? (
                        <div className="sortby-dropdown">
                            <button onClick={() => handleSortbyChange("price")} 
                                className={sortby === "price" ? `active-sort` : ``}
                            >
                                Price
                            </button>
                            <button onClick={() => handleSortbyChange("time")}
                                className={sortby === "time" ? `active-sort` : ``}
                            >
                                Time
                            </button>
                            <button onClick={() => handleSortbyChange("rating")}
                                className={sortby === "rating" ? `active-sort` : ``}
                            >
                                Rating
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            

            {displayByRec ? 
                <div>
                    <div className="category-header">Recommendations</div>
                    <CarouselDisplay
                        user={user}
                        recipes={recipes}
                        handleSave={handleSave}
                        handleUnsave={handleUnsave}
                        justOnce={true}
                        bitValue={bitValue}
                    />
                </div>
                :
                <>
                {/* fix price */}
                {sortby === "price" ? (
                    <>
                        <div className="category-header">Under $10</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"expense"}
                            rangeA={0}
                            rangeB={30}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Under $20</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"expense"}
                            rangeA={30}
                            rangeB={40}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Under $30</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"expense"}
                            rangeA={40}
                            rangeB={50}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
                    </>
                ) : null}
    
                {sortby === "time" ? (
                    <>
                        <div className="category-header">Under 20 min</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"prep_time"}
                            rangeA={10}
                            rangeB={20}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Under 30 min</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"prep_time"}
                            rangeA={20}
                            rangeB={30}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Under 40 min</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"prep_time"}
                            rangeA={30}
                            rangeB={40}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
                    </>
                ) : null}
    
                {sortby === "rating" ? (
                    <>
                        <div className="category-header">Over 80%</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"rating"}
                            rangeA={80}
                            rangeB={101}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Over 60%</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"rating"}
                            rangeA={60}
                            rangeB={80}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
    
                        <div className="category-header">Over 40%</div>
                        <CarouselDisplay
                            user={user}
                            recipes={recipes}
                            type={"rating"}
                            rangeA={40}
                            rangeB={60}
                            handleSave={handleSave}
                            handleUnsave={handleUnsave}
                        />
                    </>
                ) : null}
                </>
            }
        </div>
    );
}
