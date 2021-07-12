import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import apiClient from "../../services/apiClient";

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
  }, [user]);

  return (
    <div className="Register">
      Register page
      <div>
        {errors.form}
        <div>
          first name:
          <input
            type="text"
            name="first_name"
            placeholder="first_name"
            value={form.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          last name:
          <input
            type="text"
            name="last_name"
            placeholder="last_name"
            value={form.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          email:
          <input
            type="email"
            name="email"
            placeholder="Enter a valid email"
            value={form.email}
            onChange={handleInputChange}
          />
          {errors.email}
        </div>
        <div>
          username:
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleInputChange}
          />
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
        <button onClick={handleSubmit}> register </button>
      </div>
    </div>
  );
}
