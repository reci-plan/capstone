import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiClient from "../../services/apiClient";
import veganIcon from "../../assets/vegan-icon.svg";
import vegetarianIcon from "../../assets/vegetarian-icon.svg";
import dairyfreeIcon from "../../assets/dairyfree-icon.svg";
import glutenfreeIcon from "../../assets/glutenfree-icon.svg";
import "./IndividualRecipe.css";

export default function IndividualRecipe() {
  const { recipeId } = useParams();
  // console.log("recipeId", recipeId);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [curComments, setCurComments] = useState([]);

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipeInfo(
        recipeId
      );
      console.log(data);
      if (data) {
        setRecipeInfo(data);
      }
      if (data?.analyzedInstructions[0]?.steps) {
        setRecipeInstructions(data.analyzedInstructions[0].steps);
      }

      if (data?.extendedIngredients) {
        setRecipeIngredients(data.extendedIngredients);
      }
      if (error) {
        console.log(error, "IndividualRecipe.js");
      }
    };
    fetchRecipeInfo();
  }, [recipeId]);

  // get comments for cur recipe.
  useEffect(() => {
    const fetchCurrentComments = async () => {
      const { data, error } = await apiClient.getCurrentComments(recipeId);
      if (data) {
        console.log(
          "data.getAllComments: >>>>>>>>>>>>>>> ",
          data.getAllComments
        );
        // console.log(
        //   "data.getAllComments[data.getAllComments.length-1]",
        //   data.getAllComments[data.getAllComments.length - 1]
        // );

        setCurComments(data.getAllComments);
      }
      if (error) {
        alert(error);
      }
    };
    fetchCurrentComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(comment);
    const { data, error } = await apiClient.postComment({ comment }, recipeId);
    if (data) {
      console.log("data.publishComment: >>>>>>>>> ", data.publishComment);
      setCurComments((prevState) => [...prevState, data.publishComment]);
    }
    if (error) {
      alert(error);
    }
    setComment("");
  };

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
  };

  const handleDelete = async (e, comment) => {
    // console.log("Before api call", comment);
    const { data, error } = await apiClient.deleteComment(comment);
    if (data) {
      console.log(data);
      setCurComments(curComments.filter((c) => c.id != comment.id));
    }

    if (error) {
      alert(error);
    }
  };

  const handleEdit = async (e, comment) => {
    const newComment = { ...comment, comment: comment.comment + "a" };
    const { data, error } = await apiClient.editComment(newComment);
    if (data) {
      setCurComments(
        curComments.map((c) =>
          c.id === newComment.id ? { ...c, comment: newComment.comment } : c
        )
      );
    }
    if (error) {
      alert(error);
    }
  };

  console.log("curComments: >>>>>>>> ", curComments);
  return (
    <div className="IndividualRecipe">
      <div className="recipe-top">
        <div className="recipe-title">{recipeInfo.title}</div>
        <div className="recipe-diet">
          {recipeInfo.vegan ? (
            <img src={veganIcon} alt="Vegan Icon"></img>
          ) : null}
          {recipeInfo.vegetarian ? (
            <img src={vegetarianIcon} alt="Vegetarian Icon"></img>
          ) : null}
          {recipeInfo.dairyFree ? (
            <img src={dairyfreeIcon} alt="Dairy Free Icon"></img>
          ) : null}
          {recipeInfo.glutenFree ? (
            <img src={glutenfreeIcon} alt="Gluten Free Icon"></img>
          ) : null}
        </div>
      </div>

      <div className="recipe-display">
        {/* Left Side */}
        <div className="recipe-left">
          <div className="recipe-img">
            <img src={recipeInfo.image} alt={recipeInfo.title}></img>
          </div>
          <div className="recipe-ingre">
            <div className="heading">Ingredients</div>
            {recipeIngredients.length > 0
              ? recipeIngredients.map((element) => (
                  <div key={element.id}>{element.original}</div>
                ))
              : null}
          </div>
        </div>

        {/* Right Side */}
        <div className="recipe-right">
          <div className="heading">Instructions</div>
          {recipeInstructions.length > 0
            ? recipeInstructions.map((element) => (
                <div key={element.number}>
                  {element.number}. {element.step}
                </div>
              ))
            : null}
        </div>
      </div>
      <div>
        comments
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="textarea"
              value={comment}
              onChange={handleTextAreaChange}
            ></textarea>
            <button> comment </button>
          </form>
        </div>
        {curComments.map((comment) => (
          <div>
            comment: {comment?.comment}, date: {comment?.date}, user id:{" "}
            {comment?.user_id}, ID (primary key): {comment?.id}{" "}
            <button onClick={(e) => handleDelete(e, comment)}> Delete </button>
            <button onClick={(e) => handleEdit(e, comment)}> Edit </button>
          </div>
        ))}
      </div>
    </div>
  );
}
