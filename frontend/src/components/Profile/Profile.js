import { useState, useEffect } from "react";


export default function Profile({ user }) {
    const [errors, setErrors] = useState("");

    return (
        <div className="Profile">
            <div className="section-title">Profile</div>
            <div>
                <img src="" alt="User profile img"></img>
                <div>

                </div>
            </div>
            <div>
                <div>{user.first_name} {user.last_name}</div>
                <div> username: {user.username}</div>
                <div> email: {user.email}</div>
            </div>
        </div>
    );
}
