import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function Navbar({ user, setUser }) {
    const handleLogout = async () => {
        await apiClient.logout();
        setUser({});
    };

    return (
        <div style={{ border: "1px solid black" }}>
            Navbar
            <Link to="/"> home page </Link>
            <div>
                {user?.email ? (
                    <>
                        Hello, {user.first_name}
                        <div>
                            <button onClick={handleLogout}> logout </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <Link to="/register"> Register </Link>
                            <Link to="/login"> login </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
