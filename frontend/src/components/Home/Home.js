import { Link } from "react-router-dom";

import './Home.css'
import home from '../../assets/home.png'
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";


export default function Home({ user }) {
    return (
        <div className="Home" style={{backgroundImage: `url(${home})`}}>
            <div className="home-header">
                {user.email ? (
                    <div>
                        <div>Good morning, {user.first_name}</div>
                    </div>
                ) : (
                    <div>
                        <span>Good morning!</span>
                    </div>
                )}
            </div>
            
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