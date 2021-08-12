import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

import "./SampleLayout.css";
import SocialMediaShare from "./SocialMediaShare/SocialMediaShare";
import RecipeCard from "../RecipeCard/RecipeCard";

import {
    Paper,
    Typography,
    CircularProgress,
    Grid,
    Box,
} from "@material-ui/core";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core/styles";

import veganIcon from "../../assets/vegan-icon.svg";
import vegetarianIcon from "../../assets/vegetarian-icon.svg";
import dairyfreeIcon from "../../assets/dairyfree-icon.svg";
import glutenfreeIcon from "../../assets/glutenfree-icon.svg";
import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";

const shuffle = (state_arr) => {
    let ctr = state_arr.length,
        temp,
        index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = state_arr[ctr];
        state_arr[ctr] = state_arr[index];
        state_arr[index] = temp;
    }
    console.log(">> state_arr", state_arr);
    return state_arr;
};

export default function SampleLayout({
    recipeInfo,
    recipeIngredients,
    recipeInstructions,
    extraInformation,
    recipes,
    handleSave,
    handleUnsave,
    user,
}) {
    const EXTRA_STATS_ARR = [
        "Prep Time",
        "Rating",
        "Price Per Serving",
        "Servings",
        "Ingredients Count",
        "Calories",
    ];

    const [saved, setSaved] = useState(false);
    const { recipeId } = useParams();

    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [topRecipes, setTopRecipes] = useState([]);
    const [bitValue, setBitValue] = useState();

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1.5),
            backgroundColor: "#D4D4D4",
            // height: 140,
            // width: 100,
        },
        test: {
            color: "#8D8D8D",
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        const checkRecipe = async () => {
            const { data, error } = await apiClient.checkSavedRecipe(
                recipeInfo?.id
            );

            setSaved(data);

            if (error) {
                console.log("Check saved recipe error.......RecipeCard.js");
            }
        };

        checkRecipe();
    }, [recipeInfo, recipeId]);

    console.log("saved in samplelayout: ", saved);
    console.log("saved in samplelayout: ", recipeInfo);

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

    // from the recipes state,
    // have a new state containing all of recipes, but shuffled for randomized results

    // useEffect(() => {
    //     const top_rated_recipes = recipes.filter(
    //         (r) => r.rating >= 78 && r.api_id !== recipeId
    //     );

    // }, []);

    const getGreeting = () => {
        var today = new Date();
        var curHr = today.getHours();

        if (curHr < 12) {
            // setTheCurrentTime("morning");
            return "Good Morning";
        } else if (curHr < 18) {
            // setTheCurrentTime("afternoon");
            return "Good Afternoon";
        } else {
            // setTheCurrentTime("evening");
            return "Good Evening";
        }
    };

    useEffect(() => {
        const time = getGreeting();

        // Main course || side dish || salad || appetizer || soup
        const meals = [64, 32, 16, 8, 4];
        if (time === "Good Morning") {
            // breakfast
            setBitValue(128);
        } else if (time === "Good Afternoon") {
            setBitValue(meals[Math.floor(Math.random() * meals.length)]);
        } else {
            setBitValue(meals[Math.floor(Math.random() * meals.length)]);
        }
    }, [recipeId]);

    useEffect(() => {
        const recommended_shuffled = shuffle(
            recipes.filter(
                (r) =>
                    (r?.category & bitValue) === bitValue &&
                    r?.api_id !== recipeInfo?.api_id
            )
        );
        setRecommendedRecipes([...recommended_shuffled]);
    }, [recipeId, bitValue, recipes]);

    useEffect(() => {
        const top_shuffled = shuffle(
            recipes.filter(
                (r) => r.rating >= 75 && r.api_id !== recipeInfo.api_id
            )
        );

        // console.log(top_shuffled, ": topshuffled");
        setTopRecipes([...top_shuffled]);
    }, [recipeId, recipes]);

    // console.log(topRecipes, recommendedRecipes);

    return (
        // Give some space below the navbar
        <div className="LayoutDivWrapper">
            <div className="Layout_Flex_Wrapper">
                <div className="Layout_Left_Side">
                    <div className="Layout_Title">
                        <div className="Layout_Title_Real">
                            {recipeInfo.title}{" "}
                            {user?.email ? (
                                <button
                                    className="save-btn"
                                    onClick={handleOnClick}
                                >
                                    {saved ? (
                                        <img
                                            src={heartFill}
                                            alt="Solid Heart to unsave recipe"
                                        ></img>
                                    ) : (
                                        <img
                                            src={heart}
                                            alt="Heart to save recipe"
                                        />
                                    )}
                                </button>
                            ) : null}
                        </div>
                    </div>

                    <div className="recipe-top">
                        <div className="recipe-diet">
                            <img src={veganIcon} alt="Vegan Icon"></img>

                            <img
                                src={vegetarianIcon}
                                alt="Vegetarian Icon"
                            ></img>

                            <img
                                src={dairyfreeIcon}
                                alt="Dairy Free Icon"
                            ></img>

                            <img
                                src={glutenfreeIcon}
                                alt="Gluten Free Icon"
                            ></img>
                        </div>
                    </div>
                    <div className="Layout_Image_Div">
                        <img
                            className="Layout_Image"
                            src={recipeInfo.image_url}
                        />
                    </div>
                    <div className="Layout_Ingredients_Info_Wrapper">
                        <div className="Layout_Ingredients_Heading">
                            <div className="Layout_Horizontal_Line">
                                <hr className="LayoutHorizontal_hr" />
                            </div>
                            <div className="Layout_Ingredients_Title">
                                Ingredients
                            </div>
                        </div>
                        <div className="Layout_Ingredients_RealIngredients">
                            <ul className="Layout_Ingredients_ul">
                                {recipeIngredients.map((ingredient) => (
                                    <li className="Layout_Ingredients_li">
                                        <span
                                            style={{
                                                margin: "0px 10px",
                                            }}
                                        >
                                            •
                                        </span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="Layout_Ingredients_Heading">
                        <div className="Layout_Horizontal_Line">
                            <hr className="LayoutHorizontal_hr" />
                        </div>

                        <div className="Layout_Ingredients_Title">
                            Instructions
                        </div>
                    </div>
                    <div className="Layout_Instructions_Div">
                        {recipeInstructions.map((instruction, i) => (
                            <Paper
                                elevation={2}
                                className={`${classes.paper} Layout_Instructions_Paper`}
                            >
                                <Typography variant="h6">
                                    {i + 1}. {instruction}
                                </Typography>
                            </Paper>
                        ))}
                    </div>
                </div>

                <div
                    className="Layout_Right_Side"
                    // style={{ border: "1px solid blue" }}
                >
                    <div
                        className="Layout_Title_Share"
                        style={{ margin: "15px 0px" }}
                    >
                        <div className="ShareThisRecipe">
                            Share this recipe:
                        </div>
                        <SocialMediaShare recipeInfo={recipeInfo} />
                    </div>
                    <div className="Layout_Space_BetweenLines">
                        <div className="Layout_Horizontal_Line">
                            <hr className="LayoutHorizontal_hr" />
                        </div>
                        <div className="Layout_Ingredients_Title_Right">
                            Fun Stats & Data
                        </div>
                    </div>
                    <div
                        className="Layout_Stats_And_Data_Real"
                        style={{ margin: "50px 0px" }}
                    >
                        <div className="Layout_Stats_Card">
                            <Grid container spacing={1}>
                                {Object.entries(extraInformation).map(
                                    ([key, val], i) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            wrap="wrap"
                                            // style={{
                                            //     border: "1px solid black",
                                            // }}
                                        >
                                            <Typography
                                                align="center"
                                                gutterBottom
                                                className="ExtraInformationHeader"
                                                // style={{
                                                //     wordWrap: "break-word",
                                                // }}
                                            >
                                                <Box fontWeight="fontWeightBold">
                                                    {EXTRA_STATS_ARR[i]}
                                                </Box>
                                            </Typography>

                                            <Typography
                                                className={classes.test}
                                                align="center"
                                            >
                                                {val}
                                            </Typography>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </div>
                    </div>

                    <div
                        className="Layout_Space_BetweenLines"
                        style={{ margin: "50px 0" }}
                    >
                        {recommendedRecipes.length > 0 ? (
                            <>
                                <div className="Layout_Horizontal_Line">
                                    <hr className="LayoutHorizontal_hr" />
                                </div>
                                <div className="Layout_Ingredients_Title_Right">
                                    Recommended Recipes
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className="Layout_Recommended_Recipes_Wrapper">
                        {[...Array(2)].map((x, i) => {
                            if (i < recommendedRecipes.length) {
                                return (
                                    <div style={{ margin: "3px 8px" }}>
                                        <RecipeCard
                                            recipeInfo={recommendedRecipes[i]}
                                            user={user}
                                            handleSave={handleSave}
                                            handleUnsave={handleUnsave}
                                            dontDisplaySave={true}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div
                        className="Layout_Space_BetweenLines"
                        style={{ margin: "50px 0" }}
                    >
                        <div className="Layout_Horizontal_Line">
                            <hr className="LayoutHorizontal_hr" />
                        </div>
                        <div className="Layout_Ingredients_Title_Right">
                            Top Recipes
                        </div>
                    </div>
                    <div className="Layout_Recommended_Recipes_Wrapper">
                        {[...Array(2)].map((x, i) => {
                            return (
                                <div style={{ margin: "3px 8px" }}>
                                    <RecipeCard
                                        recipeInfo={topRecipes[i]}
                                        user={user}
                                        handleSave={handleSave}
                                        handleUnsave={handleUnsave}
                                        dontDisplaySave={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="Layout_Bottom_Flex_Wrapper">
                <div className="Layout_Bottom_Left">
                    {/*      <div className="Layout_Ingredients_Heading">
                        <div className="Layout_Horizontal_Line">
                            <hr className="LayoutHorizontal_hr" />
                        </div>

                        <div className="Layout_Ingredients_Title">
                            Instructions
                        </div>
                    </div>
                    <div className="Layout_Instructions_Div">
                        {recipeInstructions.map((instruction, i) => (
                            <Paper
                                elevation={2}
                                className={classes.paper}
                                style={{
                                    margin: "30px",
                                    backgroundColor: "#D4D4D4",
                                }}
                            >
                                <Typography variant="h5">
                                    {i + 1}. {instruction}
                                </Typography>
                            </Paper>
                        ))}
                    </div>*/}
                </div>
                <div className="Layout_Bottom_Right"></div>
            </div>
        </div>
    );
}
