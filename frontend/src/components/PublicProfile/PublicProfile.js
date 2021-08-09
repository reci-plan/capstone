import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

import tempImg from "../../assets/tempProfileImg.png";
import location from "../../assets/location.svg";
import profileBackground from "../../assets/profile.png";

import Profile from "../Profile/Profile";

export default function PublicProfile({ allFlavors }) {
    const { user_id_here } = useParams();
    const [curProfile, setCurProfile] = useState({});
    const [curUser, setCurUser] = useState({});
    const [curFlavors, setCurFlavors] = useState([]);

    // Fetches the profile
    useEffect(() => {
        const fetchProfileFromUserId = async () => {
            const { data, error } = await apiClient.getProfileFromUserId(
                user_id_here
            );
            if (data) {
                setCurProfile(data);
                if (data.fav_flavors) {
                    let flavors = [];
                    data.fav_flavors.split("").forEach((c) => {
                        let num = Number(c);
                        let obj = { flavor: allFlavors[num], id: c };
                        flavors.push(obj);
                    });
                    setCurFlavors(flavors);
                } else {
                    setCurFlavors([]);
                }
            }
            if (error) {
                console.log(error);
            }
        };
        fetchProfileFromUserId();
    }, [user_id_here]);

    // Fetches the user
    useEffect(() => {
        const fetchUserFromUserId = async () => {
            const { data, error } = await apiClient.fetchUserById(user_id_here);
            if (data) {
                setCurUser(data);
            }
            if (error) {
                alert(error);
            }
        };
        fetchUserFromUserId();
    }, []);

    return <Profile user={curUser} profile={curProfile} flavors={curFlavors} />;
}
