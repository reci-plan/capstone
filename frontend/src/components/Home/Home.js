import { Link } from "react-router-dom";

import './Home.css'
import home from '../../assets/home.png'
export default function Home({ user }) {
    return (
        <div className="Home">
            <img src={home} alt="Kitchen background"></img>
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
        </div>
    );
}
