import { useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import search from "../../assets/search.png";
import "./SearchFilter.css";

export default function SearchFilter({
  user,
  recipes,
  handleSave,
  handleUnsave,
}) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(Number(-1));
  const [categoryName, setCategoryName] = useState("");
  const mealTypes = [
    "Breakfast",
    "Main Course",
    "Side Dish",
    "Salad",
    "Appetizer",
    "Soup",
    "Finger Food",
    "Drink",
  ];

  const diets = ["Vegetarian", "Vegan", "Gluten Free", "Dairy Free"];

  const data = [
    "Vegetarian",
    "Vegan",
    "Gluten Free",
    "Dairy Free",
    "Breakfast",
    "Main Course",
    "Side Dish",
    "Salad",
    "Appetizer",
    "Soup",
    "Finger Food",
    "Drink",
  ];

  const handleOnClick = (e) => {
    const index = data.indexOf(e.target.innerHTML);
    setCategoryName(e.target.innerHTML);
    setCategory(1 << (11 - index));
    setShow(!show);
  };

  const handleViewAll = () => {
    setCategory(0);
    setShow(!show);
  };

  return (
    <div
      className={`SearchFilter ${show ? "searchoff" : null}`}
      style={{ backgroundImage: `url(${search})` }}
    >
      {!show ? (
        <>
          <div className="filter-by">
            <div className="filter-name">Meal Types</div>
            <ul className="list-flex">
              {mealTypes.map((item, idx) => (
                <li key={idx} onClick={handleOnClick}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="center">
            <div className="vl"></div>
            <div className="viewall" onClick={handleViewAll}>
              View all
            </div>
          </div>

          <div className="filter-by">
            <div className="filter-name">Diets</div>
            <ul>
              {diets.map((item, idx) => (
                <li key={idx} onClick={handleOnClick}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="filter-display-name">
          {recipes.filter((r) => Boolean((r.category & category) === category))
            .length === 0 ? (
            <div className="results">No results for {categoryName}</div>
          ) : (
            <div className="results">{categoryName}</div>
          )}
          <div className="filter-display">
            {recipes
              .filter((r) => Boolean((r.category & category) === category))
              .map((r) => (
                <RecipeCard
                  key={r.id}
                  user={user}
                  recipeInfo={r}
                  handleSave={handleSave}
                  handleUnsave={handleUnsave}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
