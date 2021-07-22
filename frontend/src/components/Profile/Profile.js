import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import apiClient from "../../services/apiClient";

import './Profile.css'
export default function Profile({ user }) {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await apiClient.fetchProfile()
            if (data) {
                console.log(data)
                setProfile(data)
            }
            if (error) {
                console.log(error, "Profile.js")
            }
        }

        fetchProfile()
    }, [])

    console.log(profile)

    return (
        <div className="Profile">
            <div className="section-title">Profile</div>
            <div>
                <img src="" alt="User profile img"></img>
                <div className="fav-flavors">

                </div>
            </div>
            <div>
                <div>{user.first_name} {user.last_name}</div>
                <div> username: {user.username}</div>
                <div> email: {user.email}</div>
            </div>
            <Link to='/profile/edit'>...</Link>
        </div>
    );
}
