import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

import './Login.css'
import blueberry from '../../assets/blueberry.png'

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
    <div className="Login" style={{backgroundImage: `url(${blueberry})`}}>
      <div>
        <span className="section-title">Login</span>
        <div className="form">
          <div>
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
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          <div>{errors.form}</div>
          <button className="btn" onClick={handleLogin}>login</button>

          <div className="login-footer">
            <p>
              Don't have an account? Register <Link to="/register">here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
