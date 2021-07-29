import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommunityPostPage from "./CommunityPostPage/CommunityPostPage";
import apiClient from "../../services/apiClient";

export default function Community({ user }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const { data, error } = await apiClient.fetchAllCommunityPosts();
            if (data) {
                setRecipes(data.allPosts);
            }
            if (error) {
                alert(error);
            }
        };
        fetchApi();
    }, []);

    const handleDeletePost = async (recipe_to_delete) => {
        console.log(recipe_to_delete);
        const { data, error } = await apiClient.deletePostFromCommunity(
            recipe_to_delete
        );
        if (data) {
            setRecipes(recipes.filter((r) => r.id !== recipe_to_delete.id));
        }
        if (error) {
            alert(error);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            Main div
            <>
                <CommunityPostPage recipes={recipes} setRecipes={setRecipes} />
            </>
            {recipes.map((r) => (
                <div>
                    title: <b>{r.title}</b>, category: <b>{r.category}</b>,
                    image_url: <b>{r.image_url}</b>, prep_time:{" "}
                    <b>{r.prep_time}</b>, desc: <b>{r.description}</b>, posted
                    By: <b>{r.username}</b>
                    {r.rating && (
                        <b>
                            {" "}
                            {`, rating: ${parseFloat(r.rating).toFixed(
                                2
                            )}`}{" "}
                        </b>
                    )}
                    {r.user_id === user.id && (
                        <button onClick={() => handleDeletePost(r)}>
                            delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
