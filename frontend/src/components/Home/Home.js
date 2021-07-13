import { Link } from "react-router-dom";
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";

import "./Home.css";
export default function Home({ user }) {
    return (
        <div className="Home">
            Home page
            <Link to="/experiment">
                <div style={{ margin: "20px" }}> experiment page </div>
            </Link>
            {user.email ? (
                <>
                    <div> username: {user.username}</div>
                    <div> first_name: {user.first_name}</div>
                    <div> last_name: {user.last_name}</div>
                    <div> email: {user.email}</div>
                </>
            ) : (
                <> </>
            )}
            <DisplayAllRecipes />
        </div>
    );
}
