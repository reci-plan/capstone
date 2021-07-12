import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((prevState) => ({
          ...prevState,
          email: "Please enter a valid email.",
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, email: null }));
      }
    }
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    const { data, error } = await apiClient.login({
      email: form.email,
      password: form.password,
    });

    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }

    if (error) {
      setErrors((prevState) => ({ ...prevState, form: error }));
    }
  };

  // when user logs in then redirect to "/"
  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="Login">
      <div>
        Login page
        <div> {errors.form} </div>
        <div>
          email:
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleInputChange}
          />
          {errors.email}
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleLogin}> login </button>
      </div>
      <div className="login-footer">
        <p>
          Don't have an account? Register <Link to="/register">here</Link>.
        </p>
      </div>
    </div>
  );
}
