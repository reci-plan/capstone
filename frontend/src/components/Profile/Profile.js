import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

import searchIcon from "../../assets/search-icon.svg";
import tempImg from "../../assets/tempProfileImg.png";
import location from "../../assets/location.svg";
import profileBackground from "../../assets/profile.jpg";
import "./Profile.css";

export default function Profile({ user, isSameUser }) {
    const navigate = useNavigate();
    const { username } = useParams();

    const [thisUser, setThisUser] = useState({});
    const [thisProfile, setThisProfile] = useState({});
    const [flavors, setFlavors] = useState("");
    const [profileTerm, setProfileTerm] = useState("");
    console.log(window.location.href.split("0/"));
    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data, error } = await apiClient.fetchUserAndProfile(
                username ? username : user.username
            );
            if (data) {
                setThisUser(data[0]);
                setThisProfile(data[1]);
            }
            if (error) {
                console.log(error, "Profile.js");
            }
        };

        if (user.email) {
            fetchUserAndProfile();
        }
    }, [user, username]);

    const handleOnChange = (e) => {
        setProfileTerm(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (profileTerm) {
            localStorage.setItem("profile-search-term", profileTerm);
            navigate("/profileResults");
        }
    };
    const allFlavors = [
        "spicy",
        "salty",
        "sweet",
        "sour",
        "bitter",
        "savory",
        "fatty",
    ];

    useEffect(() => {
        if (thisProfile?.fav_flavors) {
            var flavors = [];
            thisProfile.fav_flavors.split("").forEach((c) => {
                let num = Number(c);
                var obj = { flavor: allFlavors[num], id: c };
                flavors.push(obj);
            });
            setFlavors(flavors);
        } else {
            setFlavors([]);
        }
    }, [thisProfile]);

    return (
        <div
            className="Profile"
            style={{ backgroundImage: `url(${profileBackground})` }}
        >
            {!user.email ? (
                <div>
                    Login <Link to="/login">here</Link> to view your profile
                    page
                </div>
            ) : (
                <div className="profile-display">
                    <div className="profile-left">
                        <div className="profile-img">
                            {thisProfile.image_url ? (
                                <img
                                    src={thisProfile.image_url}
                                    alt="User profile img"
                                ></img>
                            ) : (
                                <img src={tempImg} alt="Placeholder img"></img>
                            )}
                        </div>
                        {!username ? (
                            <form
                                className="profile-search"
                                onSubmit={handleOnSubmit}
                            >
                                <div>
                                    <img
                                        src={searchIcon}
                                        alt="search icon"
                                    ></img>
                                </div>
                                <input
                                    type="text"
                                    placeholder="search users..."
                                    onChange={handleOnChange}
                                ></input>
                            </form>
                        ) : null}
                        <div className="input-flavors">
                            <span className="input-type">fav flavors: </span>
                            <div className="fav-flavors">
                                {flavors?.length > 0 ? (
                                    flavors.map((element, i) => (
                                        <div key={i} className="flavor">
                                            {element.flavor}
                                        </div>
                                    ))
                                ) : (
                                    <>none</>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">
                        <div className="profile-basic">
                            <div>
                                <div className="profile-name">
                                    {thisUser.first_name} {thisUser.last_name}
                                </div>
                                <div className="location">
                                    {thisProfile.region ? (
                                        <>
                                            <img
                                                src={location}
                                                alt="Location Icon"
                                            ></img>
                                            <span>{thisProfile.region}</span>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <span className="input-type">username: </span>
                            <span className="input-type-res">
                                {thisUser.username}
                            </span>
                        </div>
                        <div className="input">
                            <span className="input-type">email: </span>
                            <span className="input-type-res">
                                {thisUser.email}
                            </span>
                        </div>
                        {thisProfile.short_bio ? (
                            <div className="input">
                                <span className="input-type">short bio: </span>
                                <span className="input-type-res">
                                    {thisProfile.short_bio}
                                </span>
                            </div>
                        ) : null}
                    </div>

                    {isSameUser || !username || 
                    window.location.href.split("0/")[1] === "profile" ? (
                        <Link to="/profile/edit" className="edit-btn">
                            . . .
                        </Link>
                    ) : null}
                </div>
            )}
        </div>
    );
}
