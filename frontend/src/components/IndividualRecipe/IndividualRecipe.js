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
          healthScore: "healthScore",
          readyInMinutes: data.prep_time,
          servings: "servings",
          pricePerServing: data.expense / 100,
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

  // console.log(recipeInfo);
  // console.log(recipeInfo.description);
  return (
    <>
      <div style={{ padding: "0 80px" }}>
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
          {/*<div className="recipe-top">
            <div className="recipe-title">{recipeInfo.title}</div>
            <div className="recipe-diet">
              {recipeInfo.vegan ? (
                <img src={veganIcon} alt="Vegan Icon"></img>
              ) : null}
              {recipeInfo.vegetarian ? (
                <img src={vegetarianIcon} alt="Vegetarian Icon"></img>
              ) : null}
              {recipeInfo.dairyfree ? (
                <img src={dairyfreeIcon} alt="Dairy Free Icon"></img>
              ) : null}
              {recipeInfo.glutenfree ? (
                <img src={glutenfreeIcon} alt="Gluten Free Icon"></img>
              ) : null}
            </div>
          </div>*/}
          {/*This is where the additional info go. E.g: ready in minutes, calories, etc*/}
          {/*<div className="recipe-additional-info">
            {EXTRA_INFO_ARRAY.map((r, i) => (
              <>
                <MuiThemeProvider theme={additionalInfoTheme}>
                  <Paper
                    elevation={3}
                    className={classes.paper}
                    style={{ minWidth: "280px" }}
                  >
                    {isLoading ? (
                      <Typography
                        variant="h4"
                        color={i % 2 == 0 ? "primary" : "secondary"}
                        gutterBottom
                        className="boxGrayBig"
                      ></Typography>
                    ) : (
                      <Typography
                        variant="h4"
                        color={i % 2 == 0 ? "primary" : "secondary"}
                        gutterBottom
                      >
                        {EXTRA_INFO_ARRAY[i]}
                      </Typography>
                    )}

                    {isLoading ? (
                      <Typography
                        variant="body1"
                        color={i % 2 == 0 ? "secondary" : "primary"}
                        className={`${isLoading} ? boxGraySmall : ""`}
                      ></Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        color={i % 2 == 0 ? "secondary" : "primary"}
                      >
                        {extraInformation[EXTRA_INFO_ARRAY[i]]}
                      </Typography>
                    )}
                  </Paper>
                  <br />
                </MuiThemeProvider>
              </>
            ))}
          </div>*/}
          {/*  <div className="recipe-display">*/}
          {/* Left Side */}
          {/*<div className="recipe-left">
              <div className="recipe-img">
                {isLoading ? (
                  <div className="imagePlaceholder">
                    <CircularProgress
                      color="primary"
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                ) : (
                  <img src={recipeInfo.image_url} alt={recipeInfo.title}></img>
                )}
              </div>
              <div className="recipe-ingre">
                <div className="heading">Ingredients</div>
                {recipeIngredients.length > 0
                  ? recipeIngredients.map((element, idx) => (
                      <div key={idx}>{element} </div>
                    ))
                  : null}
              </div>
            </div>*/}

          {/* Right Side */}
          {/*<div className="recipe-right"> */}
          {/*<div className="heading">Instructions</div>
              {isLoading
                ? [...Array(5)].map((x) => (
                    <>
                      <Paper
                        elevation={3}
                        className={classes.paper}
                        style={{ minWidth: "280px" }}
                      >
                        <Typography
                          variant="body1"
                          className={`${isLoading} ? boxGrayDescription : ""`}
                        ></Typography>
                      </Paper>
                      <br />
                    </>
                  ))
                : recipeInstructions.length > 0
                ? recipeInstructions.map((element, idx) => (
                    <>
                      <Paper key={idx} id={`${element.idx}`} elevation={3}>
                        <Typography
                          variant="h6"
                          className={`${classes.paper} ${
                            numPicked === idx ? "active" : ""
                          }`}
                        >
                          {idx + 1}. {element}
                        </Typography>
                      </Paper>
                      <br />
                    </>
                  ))
                : null}
            </div>*/}

          {/*  <SocialMediaShare recipeInfo={recipeInfo} />*/}
          {/*<div className="heading">Steps</div>
            <div className="steps_div">
              {isLoading
                ? [...Array(5)].map((x) => (
                    <>
                      <Paper
                        elevation={3}
                        className={classes.paper}
                        style={{ minWidth: "120px" }}
                      >
                        <Typography
                          variant="body1"
                          className={`${isLoading} ? boxGraySmall : ""`}
                        ></Typography>
                      </Paper>
                      <br />
                    </>
                  ))
                : recipeInstructions.length > 0
                ? recipeInstructions.map((element, idx) => (
                    <>
                      <a
                        onClick={() => setNumPicked(idx)}
                        href={`#${idx}`}
                        style={{ textDecoration: "none", maxHeight: "100px" }}
                        className="steps_div_a"
                      >
                        <Paper key={idx}>
                          <Typography
                            variant="h6"
                            className={`${classes.paper} ${
                              numPicked === idx ? "active" : ""
                            }`}
                            onClick={(e) => console.log(e.target.className)}
                          >
                            Step {idx + 1}
                          </Typography>
                        </Paper>
                      </a>
                      <br />
                    </>
                  ))
                : null}
            </div>
          </div>
*/}
          {/*<b> summary </b> : {recipeInfo.summary}*/}

          {/*Ignore for now*/}
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
                        src="https://i.imgur.com/hepj9ZS.png"
                        alt="User avatar"
                        style={{ maxHeight: "30px" }}
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
