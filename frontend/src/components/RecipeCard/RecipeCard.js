import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";
import budgetIcon from "../../assets/budget-icon.svg";
import timeIcon from "../../assets/time-icon.svg";
import ratingIcon from "../../assets/rating-icon.svg";

import apiClient from "../../services/apiClient";

export default function RecipeCard({
  user,
  recipeInfo,
  meal,
  handleSave,
  handleUnsave,
  handleLinks,
  dontDisplaySave,
  handleLikes,
  handleMealInfo,
}) {
  const [saved, setSaved] = useState(false);
  const [links, setLinks] = useState(true);

  const [likes, setLikes] = useState(true);
  const [mealInfo, setMealInfo] = useState(true);

  useEffect(() => {
    const checkRecipe = async () => {
      const { data, error } = await apiClient.checkSavedRecipe(recipeInfo?.id);
      if (data) {
        setSaved(data);
      }

      if (error) {
        console.log("Check saved recipe error.......RecipeCard.js");
      }
      if (handleLinks === false) {
        setLinks(false);
      }
      if (handleLikes === false) {
        setLikes(false);
      }
      if (handleMealInfo === false) {
        setMealInfo(false);
      }
    };

    if (user.email) {
      checkRecipe();
    }
  }, [recipeInfo, handleLinks, handleLikes, handleMealInfo]);

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
      <Link to={`/recipes/${recipeInfo.api_id}`}>
        <div className="card-img">
          <img src={recipeInfo?.image_url} alt={recipeInfo?.title}></img>
        </div>
     </Link>
      <div className="card-info">
        <Link to={`/recipes/${recipeInfo.api_id}`}>
          <div className="card-title">
            {recipeInfo?.title.length > limit
              ? recipeInfo?.title.substring(0, limit) + "..."
              : recipeInfo?.title}
          </div>
        </Link>
        <div className="card-tips">
          <img src={budgetIcon} alt="Money sign"></img>
          <span>Budget ($/serv): {recipeInfo?.expense / 100}</span>
        </div>
        <div className="card-tips">
          <img src={timeIcon} alt="Time sign"></img>
          <span>Total time (min): {recipeInfo?.prep_time}</span>
        </div>
        <div className="card-tips">
          <img src={ratingIcon} alt="Rating sign"></img>
          <span>Rating: {parseFloat(recipeInfo?.rating / 20)}/5</span>
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

        {likes ? (
          <>
            {!dontDisplaySave ? (
              <button className="save-btn" onClick={handleOnClick}>
                {saved ? (
                  <img src={heartFill} alt="Solid Heart to unsave recipe"></img>
                ) : (
                  <img src={heart} alt="Heart to save recipe"></img>
                )}
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <div className="mealInfo">
        {meal ? (
          <>
            <p>{meal[0]}</p>
            &nbsp;
            <p>{meal[1]}</p>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
