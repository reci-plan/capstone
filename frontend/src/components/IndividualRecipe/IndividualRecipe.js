import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import apiClient from "../../services/apiClient";
import veganIcon from "../../assets/vegan-icon.svg";
import vegetarianIcon from "../../assets/vegetarian-icon.svg";
import dairyfreeIcon from "../../assets/dairyfree-icon.svg";
import glutenfreeIcon from "../../assets/glutenfree-icon.svg";
import "./IndividualRecipe.css";

import Comment from "../Comment/Comment";
import useReadjustTextareaHeight from "./useReadjustTextareaHeight";

export default function IndividualRecipe({ user }) {
  console.log(user);

  const { recipeId } = useParams();
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [curComments, setCurComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [usersComment, setUsersComment] = useState(false);
  const [editCommentMsg, setEditCommentMsg] = useState("");

  const [selectedCommentId, setSelectedCommentId] = useState("");

  const [postedBy, setPostedBy] = useState();

  // comment box
  const INITIAL_HEIGHT = 75;
  const [isExpanded, setIsExpanded] = useState(false);
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useReadjustTextareaHeight(textRef, comment);

  const onExpand = () => {
    console.log("hi");
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
      console.log("wtf");
    }
  };

  const onClose = () => {
    setComment("");
    setIsExpanded(false);
  };

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      const { data, error } = await apiClient.fetchIndividualRecipeInfo(
        recipeId
      );
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
    const { data, error } = await apiClient.postComment({ comment }, recipeId);
    if (data) {
      console.log("data.publishComment: >>>>>>>>> ", data.publishComment);
      const published_comment_with_zero_likes = {
        ...data.publishComment,
        amount: 0,
      };
      setCurComments((prevState) => [
        ...prevState,
        published_comment_with_zero_likes,
      ]);
    }
    if (error) {
      alert(error);
    }
    setComment("");
  };

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
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
          <div className="jumpto">
            {recipeInstructions.length > 0
              ? Array.from(recipeInstructions.length, (i) => {
                  console.log("here", i);
                  return <div>i</div>;
                })
              : null}
          </div>
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
        comment section:
        <div className="container">
          <form
            onClick={onExpand}
            onSubmit={handleSubmit}
            ref={containerRef}
            className={cn("comment-box", {
              expanded: isExpanded,
              collapsed: !isExpanded,
              modified: comment.length > 0,
            })}
            style={{
              minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
            }}
          >
            {!isExpanded && (
              <div className="shareThoughts">
                <div> Add a public comment... </div>
                <button className="shareThoughtsBtn" type="submit">
                  {" "}
                  New Comment{" "}
                </button>
              </div>
            )}
            <div className="header">
              <div className="user">
                <img
                  src="https://i.imgur.com/hepj9ZS.png"
                  alt="User avatar"
                  style={{ maxHeight: "30px" }}
                />
                <div className="user_info">
                  {user?.first_name} {user?.last_name}
                </div>
              </div>
            </div>
            <label htmlFor="textarea">What are your thoughts?</label>
            <hr />
            <textarea
              ref={textRef}
              onClick={onExpand}
              onFocus={onExpand}
              onChange={handleTextAreaChange}
              value={comment}
              className="comment-field"
              name="textarea"
              id="comment"
              placeholder="Share your thoughts here"
            />

            <div className="actions">
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" disabled={comment.length < 1}>
                Add Comment
              </button>
            </div>
          </form>
        </div>
        <div>
          {curComments.length} comment{curComments.length !== 1 ? "s" : ""}{" "}
        </div>
        {curComments.length === 0 ? (
          <div> Be the first to comment </div>
        ) : (
          <> </>
        )}

        {curComments.map((comment) => (
          <Comment
            comment={comment}
            setCurComments={setCurComments}
            curComments={curComments}
            editCommentMsg={editCommentMsg}
            setEditCommentMsg={setEditCommentMsg}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            setSelectedCommentId={setSelectedCommentId}
            selectedCommentId={selectedCommentId}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
