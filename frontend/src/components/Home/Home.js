import { Link } from "react-router-dom";

import './Home.css'
import home from '../../assets/home.png'
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";

export default function Home({ user }) {
    return (
        <div className="Home" style={{backgroundImage: `url(${home})`}}>
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
            {/* {recipes.length > 0 ? 
                recipes.map(element => (
                    <RecipeCard recipeInfo={element}/>
                )): null
            } */}

            <DisplayAllRecipes />
        </div>
    );
}