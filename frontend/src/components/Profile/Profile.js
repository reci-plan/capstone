import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

export default function Profile({ user }) {
    const [saved, setSaved] = useState([]);
    const [errors, setErrors] = useState("");
    // Fetch  all of the user's saved recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchSavedRecipes();
            if (data) {
                setSaved(data.savedRecipes);
            }

            if (error) {
                setErrors(error);
            }
        };
        fetchRecipes();
    }, []);
    console.log(saved);
    return (
        <div>
            {errors}
            <h2> Profile page </h2>
            <h3> Your stats </h3>
            <div> username: {user.username}</div>
            <div> first_name: {user.first_name}</div>
            <div> last_name: {user.last_name}</div>
            <div> email: {user.email}</div>

            <h3> Your saved recipes </h3>
            {saved.map((s) => (
                <div>
                    Title: {s.title}, prep_time: {s.prep_time}
                </div>
            ))}
        </div>
    );
}
