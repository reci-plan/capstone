import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient'
import './EditProfile.css';

export default function EditProfile({ user }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    short_bio: "",
    region: "",
    fav_flavors: "",
    image_url: ""
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
      if (e.target.value === "") {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

     if (e.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    
    if (e.target.name === "passwordConfirm") {
      if (form.password && form.password !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async () => {
    const { data, error } = await apiClient.updateProfile({
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      password: form.password,
      short_bio: form.short_bio,
      region: form.region,
      fav_flavors: form.fav_flavors,
      image_url: form.image_url
    })
    if (data) {
      console.log(data, "success EditProfile.js")
      navigate('/profile')
    }
    if (error) {
      console.log(error, "error EditProfile.js")
    }
  }

  return (
    <div className="EditProfile">
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
          </div>
          {errors.email}
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
          <div>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleInputChange}
            />
          </div>
          {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          <div>
            <input
              type="text"
              name="region"
              placeholder="region"
              value={form.region}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="short_bio"
              placeholder="add a short bio"
              value={form.short_bio}
              onChange={handleInputChange}
            />
          </div>
          <div>{errors.form}</div>
          <button className="btn" onClick={handleSubmit}>update</button>
        </div>
    </div>
  )
}