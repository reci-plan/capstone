import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

import tempImg from "../../assets/tempProfileImg.png";
import location from "../../assets/location.svg";
import profileBackground from "../../assets/profile.png";
import "./Profile.css";

export default function Profile({ user, profile, flavors }) {
    const colors = [{}];

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
                                    ? flavors.map((element) => (
                                          <div className="flavor">
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
                            <Link to="/profile/edit" className="edit-btn">
                                . . .
                            </Link>
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
