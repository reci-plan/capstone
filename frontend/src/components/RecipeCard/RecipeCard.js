import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";
import budgetIcon from "../../assets/budget-icon.svg";
import timeIcon from "../../assets/time-icon.svg";

import apiClient from "../../services/apiClient";

export default function RecipeCard({ user, recipeInfo, handleClick }) {
  const [saved, setSaved] = useState(false);
  const limit = 17;

  const handleOnSave = async () => {
    // if (user?.email) {
    //   saved ? setSaved(false) : setSaved(true)
    // }
    handleClick(recipeInfo, saved, setSaved);
  };

  useEffect(() => {
    async function fetchApi() {
      if (user?.email) {
        const { data, error } = await apiClient.checkIfRecipeExists(recipeInfo);
        if (data.is_existing.length === 0) {
          setSaved(false);
        } else {
          setSaved(true);
        }
      }
    }
    fetchApi();
  }, []);

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
          <span> Time (min) : {recipeInfo.prep_time}</span>
        </div>
      </div>
      <div className="card-links">
        <Link to={`recipes/${recipeInfo.api_id}`}>View more &#187;</Link>
        <button className="save-btn" onClick={handleOnSave}>
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
