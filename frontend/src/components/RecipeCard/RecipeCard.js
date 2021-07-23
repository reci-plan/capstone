import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";
import budgetIcon from "../../assets/budget-icon.svg";
import timeIcon from "../../assets/time-icon.svg";

import apiClient from "../../services/apiClient";

export default function RecipeCard({
  user,
  recipeInfo,
  handleSave,
  handleUnsave
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkRecipe = async () => {
      const { data, error } = await apiClient.checkSavedRecipe(recipeInfo.id);
      console.log(recipeInfo.title, data);
      if (data) {
        setSaved(data);
      }

      if (error) {
        console.log("Check saved recipe error.......RecipeCard.js");
      }
    };

    checkRecipe();
  }, [recipeInfo]);

  const limit = 17;

  const handleOnClick = () => {
    if (user?.email) {
      if (saved) {
        handleUnsave(recipeInfo);
        setSaved(false);
      } else {
        handleSave(recipeInfo);
        setSaved(true);
      }
    }
  };

  return (
    <div className="RecipeCard">
      <div className="card-img">
        <img src={recipeInfo.image_url} alt={recipeInfo.title}></img>
      </div>
      <div className="card-info">
        <div className="card-title">
          {recipeInfo.title.length > limit
            ? recipeInfo.title.substring(0, limit) + "..."
            : recipeInfo.title}
        </div>
        <div className="card-tips">
          <img src={budgetIcon} alt="Money sign"></img>
          <span> Budget ($) : {recipeInfo.expense}</span>
        </div>
        <div className="card-tips">
          <img src={timeIcon} alt="Time sign"></img>
          <span>Time (min) : {recipeInfo.prep_time}</span>
        </div>
      </div>
      <div className="card-links">
        <Link to={`recipes/${recipeInfo.api_id}`}>View more &#187;</Link>
        <button className="save-btn" onClick={handleOnClick}>
          {saved ? (
            <img src={heartFill} alt="Solid Heart to unsave recipe"></img>
          ) : (
            <img src={heart} alt="Heart to save recipe"></img>
          )}
        </button>
      </div>
    </div>
  );
}
