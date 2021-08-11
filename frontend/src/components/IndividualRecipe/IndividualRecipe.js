import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
// import cn from "classnames";
import placeholder from "../../assets/placeholder.svg";
import fbLogo from "../../assets/facebook-brands.svg";

import { Paper, Typography, CircularProgress } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import apiClient from "../../services/apiClient";
import veganIcon from "../../assets/vegan-icon.svg";
import vegetarianIcon from "../../assets/vegetarian-icon.svg";
import dairyfreeIcon from "../../assets/dairyfree-icon.svg";
import glutenfreeIcon from "../../assets/glutenfree-icon.svg";
import "./IndividualRecipe.css";

import Comment from "../Comment/Comment";
import useReadjustTextareaHeight from "./useReadjustTextareaHeight";
import SocialMediaShare from "./SocialMediaShare/SocialMediaShare";
import SampleLayout from "./SampleLayout";

// convert string to array, the str is in format of:
// Number + "[" + ingrdients + "]"
// brackets used to determine start and ending of current string

const stringToArray = (str, setState) => {
  let i = 0;
  while (i < str.length) {
    if (str[i] === "[") {
      let tmp_str = "";
      while (str[i] !== "]") {
        if (str[i] === "[") {
          i++;
          continue;
        }
        tmp_str += str[i];
        i++;
      }
      // translated_arr.push(tmp_str);
      setState((prevState) => [...prevState, tmp_str]);
    }
    i++;
  }
};

const getCalories = (str) => {
  // search for "calories" in the str
  // minus one to not count the space at the end of the number, this is our index
  let j = str.search(" calories") - 1;

  // if calories not found in the string
  if (j === -1) {
    return "calories not found";
  }

  // keep going through the string backwards until we finish retrieving calories amount
  let calories_amount = "";
  while (j >= 0 && str[j] !== ">") {
    calories_amount += str[j];
    j -= 1;
  }

  // gotta reverse it , its backwards right now
  // turn to list, reverse the list, join back to string
  return calories_amount.split("").reverse().join("");
};

export default function IndividualRecipe({
  user,
  recipes,
  handleSave,
  handleUnsave,
}) {
  // console.log(user);
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

  // For extra information, e.g calories, health score, ready time
  const [extraInformation, setExtraInformation] = useState([]);

  const [numPicked, setNumPicked] = useState(0);

  // loading gif, when api is still fetching data
  const [isLoading, setIsLoading] = useState(false);

  const [userProfileImg, setUserProfileImg] = useState("");

  // comment box
  const INITIAL_HEIGHT = 75;
  const [isExpanded, setIsExpanded] = useState(false);
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useReadjustTextareaHeight(textRef, comment);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onClose = () => {
    setComment("");
    setIsExpanded(false);
  };

  useEffect(() => {
    setRecipeIngredients([]);
    setRecipeInstructions([]);
  }, [recipeId]);

  // Method 1:

  // useEffect(() => {
  //   const fetchRecipeInfo = async () => {
  //     setIsLoading(true);
  //     const { data, error } = await apiClient.fetchIndividualRecipeInfo(
  //       recipeId
  //     );
  //     if (data) {
  //       setRecipeInfo(data);
  //       setExtraInformation({
  //         ingredients: data.extendedIngredients.length,
  //         healthScore: data.healthScore,
  //         readyInMinutes: data.readyInMinutes,
  //         servings: data.servings,
  //         pricePerServing: data.pricePerServing,
  //       });
  //     }
  //     if (data?.analyzedInstructions[0]?.steps) {
  //       setRecipeInstructions(data.analyzedInstructions[0].steps);
  //     }

  //     if (data?.extendedIngredients) {
  //       setRecipeIngredients(data.extendedIngredients);
  //     }
  //     if (error) {
  //       console.log(error, "IndividualRecipe.js");
  //     }
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //   };
  //   fetchRecipeInfo();
  // }, [recipeId]);

  // method 2:

  useEffect(() => {
    const fetchCurrentRecipe = async () => {
      setIsLoading(true);
      const { data, error } = await apiClient.getIndividualRecipe(recipeId);

      if (data) {
        stringToArray(data.ingredients, setRecipeIngredients);
        stringToArray(data.steps, setRecipeInstructions);
        setRecipeInfo(data);
        setExtraInformation({
          ingredients: data.ingredients.split("[").length - 1,
          rating: data.rating,
          readyInMinutes: data.prep_time,
          servings: data.servings,
          pricePerServing: data.expense / 100,
          calories: getCalories(data.description),
        });
      }

      if (error) {
        alert("IndividualRecipe.js useEffect: " + error);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };
    fetchCurrentRecipe();
  }, [recipeId]);

  console.log(recipeInfo.description);

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
        alert(`IndividualRecipe.js ${error}`);
      }
    };
    fetchCurrentComments();
  }, [recipeId]);

  // When user post new comment

  const handleSubmit = async (e) => {
    setIsExpanded(false);
    e.preventDefault();
    const { data, error } = await apiClient.postComment({ comment }, recipeId);
    if (data) {
      console.log("data.publishComment: >>>>>>>>> ", data.publishComment);
      setCurComments((prevState) => [data.publishComment, ...prevState]);
    }
    if (error) {
      alert(error);
    }
    setComment("");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await apiClient.getProfileFromUserId(user.id);
        if (data) {
          setUserProfileImg(data.image_url);
        }

      }
    };
    fetchUserProfile();
  }, [user?.id]);

  console.log(curComments);

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
  };

  // Material ui

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const additionalInfoTheme = createMuiTheme({
    palette: {
      primary: { main: "#618833", contrastText: "#fff" },
      secondary: { main: "#0586AB", contrastText: "#fff" },
      third: { main: "#8bc34a", contrastText: "#fff" },
    },
  });

  const blurStyle = {
    filter: "blur(8px)",
  };

  const EXTRA_INFO_ARRAY = [
    "ingredients",
    "healthScore",
    "readyInMinutes",
    "servings",
    "pricePerServing",
  ];

  return (
    <>
      <div className="IndividualRecipeWrapper">
        <div>
          <SampleLayout
            recipeInfo={recipeInfo}
            recipeIngredients={recipeIngredients}
            recipeInstructions={recipeInstructions}
            EXTRA_INFO_ARRAY={EXTRA_INFO_ARRAY}
            extraInformation={extraInformation}
            recipes={recipes}
            handleSave={handleSave}
            handleUnsave={handleUnsave}
            user={user}
          />
        </div>
        <div style={{ marginTop: "300px" }}> </div>
        <div
          className="IndividualRecipe"
          style={isLoading ? { filter: "blur(2px)" } : {}}
        >
          {/*<b> summary </b> : {recipeInfo.summary}*/}

          <div>
            comment section:
            <div className="container">
              {!user?.email ? (
                <div className="comment-box">
                  <div className="shareThoughts_notLoggedIn">
                    You must be{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      logged in{" "}
                    </Link>{" "}
                    to do that. Don't have an account? Sign up{" "}
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      {" "}
                      here{" "}
                    </Link>
                  </div>
                  <textarea ref={textRef} />
                </div>
              ) : (
                <form
                  onClick={onExpand}
                  onSubmit={handleSubmit}
                  ref={containerRef}
                  className={`comment-box ${
                    isExpanded ? "expanded" : "collapsed"
                  }
                ${comment.length > 0 ? "modified" : ""}`}
                  style={{
                    minHeight: isExpanded
                      ? outerHeight.current
                      : INITIAL_HEIGHT,
                  }}
                >
                  {!isExpanded && (
                    <div className="shareThoughts">
                      <div> Add a public comment... </div>
                      <button className="shareThoughtsBtn" type="submit">
                        New Comment
                      </button>
                    </div>
                  )}

                  <div className="header">
                    <div className="user">
                      <img
                        src={
                          userProfileImg
                            ? userProfileImg
                            : "https://i.imgur.com/hepj9ZS.png"
                        }
                        alt="User avatar"
                        style={{ maxHeight: "30px", maxWidth: "30px" }}
                      />
                      <div className="user_info">
                        {user?.email ? (
                          <>
                            {user?.first_name} {user?.last_name}
                          </>
                        ) : (
                          "Guest User"
                        )}
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
                    placeholder={`Share your thoughts here`}
                    disabled={!user?.email ? true : false}
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
              )}
            </div>
            <div>
              {curComments.length} comment
              {curComments.length !== 1 ? "s" : ""}{" "}
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
      </div>
    </>
  );
}
