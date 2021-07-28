import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import moment from "moment";

export default function PublicProfile() {
    const { user_id_here } = useParams();
    console.log(user_id_here);
    const [userYouAreViewing, setUserYouAreViewing] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await apiClient.getPublicUserInformation(
                user_id_here
            );
            if (data) {
                setUserYouAreViewing(data.theUser);
            }
            console.log(data);
            if (error) {
                alert(error);
            }
        };
        fetchUser();
    }, [user_id_here]);
    console.log(userYouAreViewing);
    return (
        <div style={{ margin: "250px" }}>
            This is the public profile page
            <div>
                {Object.entries(userYouAreViewing).map(([key, value]) => (
                    <div>
                        {key}: {value}
                    </div>
                ))}
                When the account was created:{" "}
                <b> {moment(userYouAreViewing).fromNow()} </b>
            </div>
        </div>
    );
}
