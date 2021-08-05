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
  handleUnsave,
  handleLinks,
  handleLikes
}) {
  const [saved, setSaved] = useState(false);
  const [links, setLinks] = useState(true);
  
  const [likes, setLikes] = useState(true);

  useEffect(() => {
    const checkRecipe = async () => {
      const { data, error } = await apiClient.checkSavedRecipe(recipeInfo.id);
      if (data) {
        setSaved(data);
      }

      if (error) {
        console.log("Check saved recipe error.......RecipeCard.js");
      }
      if (handleLinks === false) {
        setLinks(false)
      }
      if (handleLikes === false) {
        setLikes(false)
      }
    };

    checkRecipe();
  }, [recipeInfo, handleLinks, handleLikes]);

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
      {/* {Promise.resolve(recipeInfo).then(function(val) {console.log(val)})} */}
      {console.log("RECINFO", recipeInfo)}
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
          {links ? 
            <>
              <Link to={`/recipes/${recipeInfo.api_id}`}>View more &#8594;</Link>
              </>
            :
            ""
          }

          {likes ?
            <>
              <button
                className="save-btn"
                onClick={handleOnClick}
              >
                {saved ? (
                  <img src={heartFill} alt="Solid Heart to unsave recipe"></img>
                ) : (
                  <img src={heart} alt="Heart to save recipe"></img>
                )}
              </button>
            </>
            : ""
          }
        </div>
    </div>
  );
}
