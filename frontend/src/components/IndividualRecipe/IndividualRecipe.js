import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiClient from "../../services/apiClient";
import veganIcon from "../../assets/vegan-icon.svg";
import vegetarianIcon from "../../assets/vegetarian-icon.svg";
import dairyfreeIcon from "../../assets/dairyfree-icon.svg";
import glutenfreeIcon from "../../assets/glutenfree-icon.svg";
import "./IndividualRecipe.css";

export default function IndividualRecipe({ user }) {
  const { recipeId } = useParams();
  // console.log("recipeId", recipeId);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [curComments, setCurComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [usersComment, setUsersComment] = useState(false);
  const [editCommentMsg, setEditCommentMsg] = useState("");

  const [selectedCommentId, setSelectedCommentId] = useState("");

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
        setCurComments(data.getAllComments);
      }
      if (error) {
        alert(error);
      }
    };
    fetchCurrentComments();
  }, [recipeId]);

  // When user post new comment
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

  // For deleting a comment.
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

  // Editing a comment
  const handleEditSubmit = async (e, comment) => {
    e.preventDefault();
    const updatedComment = { ...comment, comment: editCommentMsg };
    const { data, error } = await apiClient.editComment(updatedComment);
    if (data) {
      setCurComments(
        curComments.map((c) =>
          c.id === updatedComment.id
            ? { ...c, comment: updatedComment.comment }
            : c
        )
      );
    }
    if (error) {
      alert(error);
    }
  };

  // when user clicks "Edit" or "Unedit" button
  const handleShowEdit = (e, comment) => {
    setShowEdit(!showEdit);
    setEditCommentMsg(comment.comment);
    setSelectedCommentId(comment.id);
  };

  const [isLike, setIsLike] = useState();
  // when user clicks "like" button
  const handleLike = async (e, comment) => {
    setSelectedCommentId(comment.id);
    setIsLike(!isLike);

    const updatedComment = isLike
      ? { ...comment, likes: comment.likes + 1 }
      : { ...comment, likes: comment.likes - 1 };

    const { data, error } = await apiClient.likeComment(updatedComment);

    if (data) {
      setCurComments(
        curComments.map((c) =>
          c.id === updatedComment.id ? { ...c, likes: updatedComment.likes } : c
        )
      );
    }

    if (error) {
      alert(error);
    }
  };

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
            comment: {comment?.comment}, date: {comment?.date}, user id:
            {comment?.user_id}, ID (primary key): {comment?.id}, likes{" "}
            {comment.likes}
            {user.id === comment.user_id ? (
              <>
                <button onClick={(e) => handleDelete(e, comment)}>
                  Delete
                </button>
                <button onClick={(e, c) => handleShowEdit(e, comment)}>
                  {showEdit && comment.id === selectedCommentId
                    ? "Unedit"
                    : "Edit"}
                </button>
              </>
            ) : (
              <> </>
            )}
            <button onClick={(e, c) => handleLike(e, comment)}>
              like
              {/*    {isLike && comment.id === selectedCommentId && "like"}
                  {!isLike && comment.id === selectedCommentId && "unlike"}*/}
            </button>
            {/*This is the form for comment editing*/}
            {showEdit && comment.id === selectedCommentId ? (
              <form
                onSubmit={(e, commentParameter) => handleEditSubmit(e, comment)}
              >
                <textarea
                  name="textareaEdit"
                  value={editCommentMsg}
                  onChange={(e) => setEditCommentMsg(e.target.value)}
                ></textarea>
                <button> submit edit </button>
              </form>
            ) : (
              <> </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
