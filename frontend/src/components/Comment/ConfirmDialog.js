import React from "react";
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue, purple, green } from "@material-ui/core/colors";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
    palette: {
        primary: {
            main: blue[900],
        },
        secondary: {
            main: "#ed4b82",
        },
    },
});

export default function ConfirmDialog(props) {
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const { onClose, selectedValue, open, handleDelete, comment, setAnchorEl } =
        props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const _handleDelete = (e, comment) => {
        handleDelete(e, comment);
        handleClose();
    };

    const handleClickNo = () => {
        handleClose();
        setAnchorEl(null);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">
                Are you sure you want to delete this comment?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Please proceed with caution. By agreeing, your comment will
                    be deleted and will be lost forever.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ThemeProvider theme={theme}>
                    <Button onClick={handleClickNo} color="secondary">
                        Disagree
                    </Button>
                    <Button
                        onClick={(e) => _handleDelete(e, comment)}
                        color="primary"
                    >
                        Agree
                    </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    );
}
