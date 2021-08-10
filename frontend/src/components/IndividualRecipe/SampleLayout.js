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
        "Ingredients Count",
        "Rating",
        "Prep Time",
        "Servings",
        "Price Per Serving",
        "Calories",
    ];

    const [saved, setSaved] = useState(false);
    const { recipeId } = useParams();
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1.5),
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
            console.log("here : ", recipeInfo?.id);
            const { data, error } = await apiClient.checkSavedRecipe(
                recipeInfo?.id
            );
            if (data) {
                console.log("DATA from checkrecipe: ", data);
                setSaved(data);
            }

            if (error) {
                console.log("Check saved recipe error.......RecipeCard.js");
            }
        };

        checkRecipe();
    }, [recipeInfo]);

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

    return (
        // Give some space below the navbar
        <div style={{ marginTop: "50px" }}>
            <div className="LayoutDivWrapper">
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
                    <div className="Layout_Title_Share">
                        <span style={{ marginRight: "20px" }}>
                            {" "}
                            Share this recipe:{" "}
                        </span>
                        <SocialMediaShare recipeInfo={recipeInfo} />
                    </div>
                </div>

                <div className="recipe-top">
                    <div className="recipe-diet">
                        <img src={veganIcon} alt="Vegan Icon"></img>

                        <img src={vegetarianIcon} alt="Vegetarian Icon"></img>

                        <img src={dairyfreeIcon} alt="Dairy Free Icon"></img>

                        <img src={glutenfreeIcon} alt="Gluten Free Icon"></img>
                    </div>
                </div>

                <div className="Layout_Flex_Wrapper">
                    <div className="Layout_Left_Side">
                        <div className="Layout_Image_Div">
                            <img
                                className="Layout_Image"
                                src={recipeInfo.image_url}
                            />
                        </div>
                        <div className="Layout_Ingredients_Info_Wrapper">
                            <div className="Layout_Ingredients_Heading">
                                <div className="Layout_Horizontal_Line">
                                    &#x2015;&#x2015;&#x2015;&#x2015;
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
                    </div>

                    <div className="Layout_Right_Side">
                        <div className="Layout_Space_BetweenLines">
                            <div className="Layout_Horizontal_Line">
                                &#x2015;&#x2015;&#x2015;&#x2015;
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
                                <Grid container spacing={2}>
                                    {Object.entries(extraInformation).map(
                                        ([key, val], i) => (
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div style={{ margin: "20px" }}>
                                                    <Typography
                                                        align="center"
                                                        gutterBottom
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
                                                </div>
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
                            <div className="Layout_Horizontal_Line">
                                &#x2015;&#x2015;&#x2015;&#x2015;
                            </div>
                            <div className="Layout_Ingredients_Title_Right">
                                Recommended Recipes
                            </div>
                        </div>

                        <div className="Layout_Recommended_Recipes_Wrapper">
                            {[...Array(4)].map((x, i) => {
                                let rng = Math.floor(
                                    Math.random() * recipes.length
                                );
                                return (
                                    <div style={{ margin: "3px 8px" }}>
                                        <RecipeCard
                                            recipeInfo={recipes[rng]}
                                            user={user}
                                            handleSave={handleSave}
                                            handleUnsave={handleUnsave}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="Layout_Bottom_Flex_Wrapper">
                    <div className="Layout_Bottom_Left">
                        <div className="Layout_Ingredients_Heading">
                            <div className="Layout_Horizontal_Line">
                                &#x2015;&#x2015;&#x2015;&#x2015;
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
                        </div>
                    </div>
                    <div className="Layout_Bottom_Right">
                        <div
                            className="Layout_Space_BetweenLines"
                            style={{ margin: "50px 0" }}
                        >
                            <div className="Layout_Horizontal_Line">
                                &#x2015;&#x2015;&#x2015;&#x2015;
                            </div>
                            <div className="Layout_Ingredients_Title_Right">
                                Top Recipes
                            </div>
                        </div>
                        <div className="Layout_Recommended_Recipes_Wrapper">
                            {[...Array(4)].map((x, i) => {
                                let rng = Math.floor(
                                    Math.random() * recipes.length
                                );
                                return (
                                    <div style={{ margin: "3px 8px" }}>
                                        <RecipeCard
                                            recipeInfo={recipes[rng]}
                                            user={user}
                                            handleSave={handleSave}
                                            handleUnsave={handleUnsave}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// <div
//                            className="Layout_Space_BetweenLines"
//                            style={{ margin: "100px 0" }}
//                        >
//                            <div className="Layout_Horizontal_Line">
//                                &#x2015;&#x2015;&#x2015;&#x2015;
//                            </div>
//                            <div className="Layout_Ingredients_Title_Right">
//                                Top Rated Recipes
//                            </div>
//                        </div>

//                        <div className="Layout_Recommended_Recipes_Wrapper">
//                            {[...Array(4)].map((x, i) => {
//                                let rng = Math.floor(
//                                    Math.random() * recipes.length
//                                );
//                                return (
//                                    <div style={{ margin: "3px 8px" }}>
//                                        <RecipeCard
//                                            recipeInfo={recipes[rng]}
//                                            user={user}
//                                            handleSave={handleSave}
//                                            handleUnsave={handleUnsave}
//                                        />
//                                    </div>
//                                );
//                            })}
//                        </div>
