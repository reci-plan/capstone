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
                        {/* <div>Here are some categories of recipes you may like!</div> */}
                    </div>
                ) : (
                    <div>
                        <span>Good morning!</span>
                        {/* <div>Login to see a list of recommendations!</div> */}
                    </div>
                )}
            </div>
            <DisplayAllRecipes />
        </div>
    );
}