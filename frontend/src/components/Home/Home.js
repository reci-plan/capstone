import { Link } from "react-router-dom";

export default function Home({ user }) {
    return (
        <div>
            Home page
            <Link to="/experiment">
                <div style={{ margin: "20px" }}> experiment page </div>{" "}
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
        </div>
    );
}
