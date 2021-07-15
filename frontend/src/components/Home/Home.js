import { Link } from "react-router-dom";
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";

import "./Home.css";
export default function Home({ user }) {
    return (
        <div className="Home">
            Home page component
            {user?.email && (
                <div>
                    <Link to="/profile">
                        <h3> Go to your profile </h3>
                    </Link>
                </div>
            )}
            <DisplayAllRecipes user={user} />
        </div>
    );
}
