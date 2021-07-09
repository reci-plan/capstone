import { Link } from "react-router-dom";

import './Home.css'
export default function Home() {
    return (
        <div className="Home">
            Home page
            <Link to="/experiment">
                <div style={{ margin: "20px" }}> experiment page </div>{" "}
            </Link>
        </div>
    );
}
