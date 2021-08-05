import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

import apiClient from "../../services/apiClient";
import "./Comment.css";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function Comment({
    comment,
    setCurComments,
    curComments,
    editCommentMsg,
    setEditCommentMsg,
    setShowEdit,
    showEdit,
    setSelectedCommentId,
    selectedCommentId,
    user,
}) {
    const { recipeId } = useParams();
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const [authorOfComment, setAuthorOfComment] = useState("");

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        const checkAuthorOfComment = async () => {
            const { data, error } = await apiClient.getOwnerOfComment(comment);
            if (data) {
                // console.log("valid call", data);
                setAuthorOfComment(
                    data.ownerOfComment.first_name[0].toUpperCase() +
                        data.ownerOfComment.first_name.slice(1) +
                        " " +
                        data.ownerOfComment.last_name[0].toUpperCase()
                );
            }
            if (error) {
                alert(`Comment.js checkAuthorOfComment(): ${error}`);
            }
        };
        checkAuthorOfComment();
    }, []);

    // Pseudo Code
    // useEffect(() => {
    //     const checkCommentAlreadyLiked = async () => {
    //         const { data, error } = await apiClient.checkIfUserIsInLikes(
    //             recipeId
    //         );
    //         if (data) {
    //             setAlreadyLiked(data.isUserInLikes);
    //         }

    //         if (error) {
    //             alert(error);
    //         }
    //     };
    //     checkCommentAlreadyLiked();
    // }, [comment, curComments]);

    // For deleting a comment.
    const handleDelete = async (e, comment) => {
        handleClose();
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
        handleClose();
        setShowEdit(!showEdit);
        setEditCommentMsg(comment.comment);
        setSelectedCommentId(comment.id);
    };

    // const [isLike, setIsLike] = useState(false);
    // when user clicks "like" button
    const handleLike = async (e, comment) => {
        setSelectedCommentId(comment.id);

        // setIsLike(!isLike);
        console.log("The comment u clicked on", comment);

        const updatedComment = alreadyLiked
            ? { ...comment, amount: comment.amount - 1 }
            : { ...comment, amount: comment.amount + 1 };

        console.log(updatedComment);
        const { data, error } = alreadyLiked
            ? await apiClient.unlikeComment(updatedComment)
            : await apiClient.likeComment(updatedComment);

        if (data) {
            setCurComments(
                curComments.map((c) =>
                    c.id === updatedComment.id
                        ? { ...c, amount: updatedComment.amount }
                        : c
                )
            );
            setAlreadyLiked(!alreadyLiked);
        }

        if (error) {
            alert(error);
        }
    };
    return (
        <div>
            {/*   comment: {comment?.comment}, date: {comment?.date}, user id:
            {comment?.user_id}, ID (primary key): {comment?.id}, likes{" "}
            {comment?.amount}, posted by: {comment.username}, alreadyLiked:
            {alreadyLiked ? "true" : "false"}*/}
            <div className="comment_div">
                <div className="comment_div_div">
                    <div className="comment_headers">
                        <div className="comment_flex">
                            <img
                                src="https://i.imgur.com/hepj9ZS.png"
                                alt="User avatar"
                            />
                            <h3 className="comment_flex_h3">
                                <b>
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to={`/publicProfile/${comment.user_id}`}
                                    >
                                        {authorOfComment}.
                                    </Link>
                                </b>
                            </h3>
                            <div style={{ color: "#B8B7B4" }}>
                                {moment(comment.date).fromNow()}{" "}
                            </div>
                        </div>
                        <div className="comment_flex_menu">
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 20 * 4.5,
                                        width: "9.5ch",
                                    },
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <MenuItem
                                    key={"edit"}
                                    onClick={(e, c) =>
                                        handleShowEdit(e, comment)
                                    }
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    key={"delete"}
                                    onClick={(e) => handleDelete(e, comment)}
                                >
                                    Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>

                    <div className="comment_desc" style={{ color: "#575757" }}>
                        {comment?.comment}
                    </div>

                    {/*<div
                        className="comment_footer"
                        style={{ marginRight: "20px" }}
                    >
                        {user.id === comment.user_id ? (
                            <>
                                <button
                                    className="btnStyle"
                                    id="deleteBtn"
                                    onClick={(e) => handleDelete(e, comment)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btnStyle"
                                    id="editBtn"
                                    onClick={(e, c) =>
                                        handleShowEdit(e, comment)
                                    }
                                >
                                    {showEdit &&
                                    comment.id === selectedCommentId
                                        ? "Unedit"
                                        : "Edit"}
                                </button>
                            </>
                        ) : (
                            <> </>
                        )}
                    </div>*/}

                    {/*{
    alreadyLiked ? (
        <button onClick={(e, c) => handleLike(e, comment)}>downvote</button>
    ) : (
        <button onClick={(e, c) => handleLike(e, comment)}>like</button>
    );
}*/}
                    {showEdit && comment.id === selectedCommentId ? (
                        <form
                            onSubmit={(e, commentParameter) =>
                                handleEditSubmit(e, comment)
                            }
                        >
                            <textarea
                                name="textareaEdit"
                                value={editCommentMsg}
                                onChange={(e) =>
                                    setEditCommentMsg(e.target.value)
                                }
                            ></textarea>
                            <button> submit edit </button>
                        </form>
                    ) : (
                        <> </>
                    )}
                </div>
            </div>
        </div>
    );
}
