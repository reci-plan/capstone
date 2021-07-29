import { useState } from "react";
import { Link } from "react-router-dom";
import CommunityPostPage from "./CommunityPostPage/CommunityPostPage";

export default function Community({ user }) {
    const [recipes, setRecipes] = useState([]);

    return (
        <div style={{ marginTop: "150px" }}>
            Main div
            <>
                <CommunityPostPage setRecipes={setRecipes} />
            </>
        </div>
    );
}
