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

import ConfirmDialog from "./ConfirmDialog";

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

    const [open, setOpen] = useState(false);

    const [authorOfComment, setAuthorOfComment] = useState("");
    const [userProfileImg, setUserProfileImg] = useState("");

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const isOpen = Boolean(anchorEl);

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
    }, [comment]);

    // For deleting a comment.
    const handleDelete = async (e, comment) => {
        handleCloseMenu();
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
        handleCloseMenu();
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            const { data, error } = await apiClient.getProfileFromUserId(
                comment.user_id
            );
            if (data) {
                setUserProfileImg(data.image_url);
            }
            if (error) {
                alert(error);
            }
        };
        fetchUserProfile();
    }, [comment.user_id]);

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
                                src={
                                    userProfileImg
                                        ? userProfileImg
                                        : "https://i.imgur.com/hepj9ZS.png"
                                }
                                style={{ height: "30px", width: "30px" }}
                            />
                            <h3 className="comment_flex_h3">
                                <b>
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to={`/publicProfile/${comment.user_id}`}
                                    >
                                        <span className="authorOfComment">
                                            {" "}
                                            {authorOfComment}.{" "}
                                        </span>
                                    </Link>
                                </b>
                            </h3>
                            <div style={{ color: "#B8B7B4" }}>
                                <span className="comment_date">
                                    {" "}
                                    {moment(comment.date).fromNow()}{" "}
                                </span>
                            </div>
                        </div>
                        <div className="comment_flex_menu">
                            {user.id === comment.user_id ? (
                                <>
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
                                        open={isOpen}
                                        onClose={handleCloseMenu}
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
                                            {showEdit &&
                                            comment.id === selectedCommentId
                                                ? "Unedit"
                                                : "Edit"}
                                        </MenuItem>
                                        <MenuItem
                                            key={"delete"}
                                            onClick={() => setOpen(true)}
                                        >
                                            Delete
                                        </MenuItem>
                                    </Menu>{" "}
                                </>
                            ) : (
                                <> </>
                            )}
                        </div>
                        <ConfirmDialog
                            open={open}
                            onClose={handleClose}
                            selectedValue={"hi"}
                            handleDelete={handleDelete}
                            comment={comment}
                            setAnchorEl={setAnchorEl}
                        />
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
