import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import apiClient from "../../services/apiClient";

import location from "../../assets/location.svg"
import './Profile.css'
export default function Profile({ user }) {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await apiClient.fetchProfile()
            if (data) {
                setProfile(data)
            }
            if (error) {
                console.log(error, "Profile.js")
            }
        }

        fetchProfile()
    }, [user])

    console.log(profile)

    return (
        <div className="Profile">
            <div className="section-title">Profile</div>
            <div>
                <img src="" alt="User profile img"></img>
                <div className="fav-flavors">
                {/* Categories to input flavors */}
                {profile.fav_flavors ? 
                    <div>fav flavors: {profile.fav_flavors}</div> : null
                }
                </div>
            </div>
            <div>
                <div>
                    <div className="profile-name">{user.first_name} {user.last_name}</div>
                    <div className="profile-img">
                        {profile.region ? 
                        <>
                            <img src={location} alt="Location Icon"></img>
                            <div>{profile.region}</div> 
                        </> : null
                        }
                    </div>
                </div>
                <div> username: {user.username}</div>
                <div> email: {user.email}</div>
                {profile.short_bio ? 
                    <div>short bio: {profile.short_bio}</div> : null
                }
            </div>
            <Link to='/profile/edit'>...</Link>
        </div>
    );
}
