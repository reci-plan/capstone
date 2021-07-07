import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            Home page
            <Link to="/experiment">
                <div style={{ margin: "20px" }}> experiment page </div>{" "}
            </Link>
        </div>
    );
}
