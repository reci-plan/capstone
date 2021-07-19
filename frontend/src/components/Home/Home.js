import { Link } from "react-router-dom";

import "./Home.css";
import home from "../../assets/home.png";
import DisplayAllRecipes from "../DisplayAllRecipes/DisplayAllRecipes";

export default function Home({ user, recipes, handleClickOnSave }) {
    const cur_hour = new Date().getHours();
    console.log(cur_hour);

    const greetingMessage = () => {
        let greeting;
        if (user.email) {
            if (cur_hour < 12) {
                greeting = "Morning";
            } else if (cur_hour >= 12 && cur_hour <= 17) {
                greeting = "Afternoon";
            } else {
                greeting = "Evening";
            }
            return (
                <div>
                    <div>
                        Good {greeting}, {user.first_name}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div> Good {greeting} </div>
            </div>
        );
    };

    return (
        <div className="Home" style={{ backgroundImage: `url(${home})` }}>
            <div className="home-header">{greetingMessage()}</div>

            {user?.email && (
                <div>
                    <Link to="/profile">
                        <h3> Go to your profile </h3>
                    </Link>
                </div>
            )}
            <DisplayAllRecipes
                user={user}
                recipes={recipes}
                handleClickOnSave={handleClickOnSave}
            />
        </div>
    );
}
