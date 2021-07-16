import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import apiClient from "../../services/apiClient";

import './Register.css'
import orange from '../../assets/orange.png'

export default function Register({ user, setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { data, error } = await apiClient.register({
      email: form.email,
      password: form.password,
      username: form.username,
      first_name: form.first_name,
      last_name: form.last_name,
    });
    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }
    if (error) {
      setErrors((prevState) => ({ ...prevState, form: error }));
    }
  };

  // redirect, when user registers
  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="Register" style={{backgroundImage: `url(${orange})`}}>
      <div>
        <span className="section-title">Register</span>
        <div className="form">
          <div className="input-name">
              <input
                type="text"
                name="first_name"
                placeholder="first name"
                value={form.first_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="last name"
                value={form.last_name}
                onChange={handleInputChange}
              />
          </div>
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
              type="text"
              name="username"
              placeholder="username"
              value={form.username}
              onChange={handleInputChange}
            />
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
          <button className="btn register-btn" onClick={handleSubmit}>register</button>
        </div>
      </div>
    </div>
  );
}
