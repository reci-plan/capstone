import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

import searchIcon from "../../assets/search-icon.svg"
import tempImg from "../../assets/tempProfileImg.png";
import location from "../../assets/location.svg";
import profileBackground from "../../assets/profile.png";
import "./Profile.css";

export default function Profile({ user, profile, isCurrentUser = true }) {
    const navigate = useNavigate()
    const [flavors, setFlavors] = useState("")
    const [profileTerm, setProfileTerm] =  useState("")

    const handleOnChange = (e) => {
        setProfileTerm(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (profileTerm) {
            localStorage.setItem('profile-search-term', profileTerm)
            navigate("/profileResults")
        }
    }
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
        if (profile?.fav_flavors) {
            var flavors = [];
            profile.fav_flavors.split("").forEach((c) => {
              let num = Number(c);
              var obj = { flavor: allFlavors[num], id: c };
              flavors.push(obj);
            });
            setFlavors(flavors);
          } else {
            setFlavors([]);
          }
    }, [profile])

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
                        {isCurrentUser ?
                            <form className="profile-search" onSubmit={handleOnSubmit}>
                                <div>
                                    <img src={searchIcon} alt="search icon"></img>
                                </div>
                                <input type="text" placeholder="search users..." onChange={handleOnChange}></input>
                            </form>
                            : null
                        }
                        <div className="profile-img">
                            {profile.image_url ? (
                                <img
                                    src={profile.image_url}
                                    alt="User profile img"
                                ></img>
                            ) : (
                                <img src={tempImg} alt="Placeholder img"></img>
                            )}
                        </div>
                        <div className="input-flavors">
                            <span className="input-type">fav flavors: </span>
                            <div className="fav-flavors">
                                {flavors?.length > 0
                                    ? flavors.map((element, i) => (
                                          <div key={i} className="flavor">
                                              {element.flavor}
                                          </div>
                                      ))
                                    : <>none</>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">
                        <div className="profile-basic">
                            <div>
                                <div className="profile-name">
                                    {user.first_name} {user.last_name}
                                </div>
                                <div className="location">
                                    {profile.region ? (
                                        <>
                                            <img
                                                src={location}
                                                alt="Location Icon"
                                            ></img>
                                            <span>{profile.region}</span>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            {isCurrentUser ?
                                <Link to="/profile/edit" className="edit-btn">
                                    . . .
                                </Link>
                                : 
                                null
                            }
                        </div>
                        <div className="input">
                            <span className="input-type">username: </span>
                            <span className="input-type-res">
                                {user.username}
                            </span>
                        </div>
                        <div className="input">
                            <span className="input-type">email: </span>
                            <span className="input-type-res">{user.email}</span>
                        </div>
                        {profile.short_bio ? (
                            <div className="input">
                                <span className="input-type">short bio: </span>
                                <span className="input-type-res">
                                    {profile.short_bio}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
