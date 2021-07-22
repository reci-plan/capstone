import { useState } from 'react';
import apiClient from '../../services/apiClient'
import './EditProfile.css';

export default function EditProfile() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    short_bio: ""
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async () => {
    const { data, error } = await apiClient.updateProfile({
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      password: form.password,
      short_bio: form.short_bio
    })

    if (data) {
      console.log(data, "success EditProfile.js")
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
              name="short_bio"
              placeholder="add a short bio"
              value={form.short_bio}
              onChange={handleInputChange}
            />
          </div>
          <div>{errors.form}</div>
          <button className="btn" onClick={handleSubmit}>register</button>
        </div>
    </div>
  )
}