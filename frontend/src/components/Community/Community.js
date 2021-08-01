import React, { useState, useEffect } from "react";
// import { Link as ReactLink } from "react-router-dom";
import CommunityPostPage from "./CommunityPostPage/CommunityPostPage";
import apiClient from "../../services/apiClient";

import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Reciplan
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Community({ user }) {
    const classes = useStyles();
    const [recipes, setRecipes] = useState([]);
    const [value, setValue] = React.useState(2);
    const [showForm, setShowForm] = useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const { data, error } = await apiClient.fetchAllCommunityPosts();
            if (data) {
                setRecipes(data.allPosts);
            }
            if (error) {
                alert(error);
            }
        };
        fetchApi();
    }, []);

    const handleDeletePost = async (recipe_to_delete) => {
        console.log(recipe_to_delete);
        const { data, error } = await apiClient.deletePostFromCommunity(
            recipe_to_delete
        );
        if (data) {
            setRecipes(recipes.filter((r) => r.id !== recipe_to_delete.id));
        }
        if (error) {
            alert(error);
        }
    };

    console.log(recipes);

    return (
        <div style={{ marginTop: "150px" }}>
            <></>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Recipe Of The Day
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        Something short and leading about the collection
                        below—its contents, the creator, etc. Make it short and
                        sweet, but not too short so folks don&apos;t simply skip
                        over it entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    Submit Your Own Recipe
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel Post
                                </Button>
                            </Grid>
                        </Grid>
                        <CommunityPostPage
                            recipes={recipes}
                            setRecipes={setRecipes}
                            showForm={showForm}
                            setShowForm={setShowForm}
                        />
                    </div>
                </Container>
            </div>

            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={3}>
                        {recipes.map((r) => (
                            <Grid item key={r} xs={12} sm={6} md={4}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="recipe"
                                                className={classes.avatar}
                                            >
                                                {r.username[0].toUpperCase()}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={`${r.title}`}
                                        subheader={`${moment(r.date).format(
                                            "MMMM Do, YYYY"
                                        )}`}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {/*This impressive paella is a perfect
                                            party dish and a fun meal to cook
                                            together with your guests. Add 1 cup
                                            of frozen peas along with the
                                            mussels, if you like.*/}
                                            {r.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            {recipes.map((r) => (
                <div>
                    title: <b>{r.title}</b>, category: <b>{r.category}</b>,
                    image_url: <b>{r.image_url}</b>, prep_time:{" "}
                    <b>{r.prep_time}</b>, desc: <b>{r.description}</b>, posted
                    By: <b>{r.username}</b>
                    <></>
                    {/*{
    r.rating && (
        <div>
            <b> {`, rating: ${parseFloat(r.rating).toFixed(2)}`} </b>
        </div>
    );
}
{
    r.user_id === user.id && (
        <button onClick={() => handleDeletePost(r)}>delete</button>
    );
}*/}
                </div>
            ))}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Short description here... Random words. Filler text...
                </Typography>
                <Copyright />
            </footer>
        </div>
    );
}
