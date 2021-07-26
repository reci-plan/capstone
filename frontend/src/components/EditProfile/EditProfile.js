import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../services/apiClient'
import Multiselect from 'multiselect-react-dropdown';
import './EditProfile.css';

export default function EditProfile({ user, handleUpdateUser, profile, flavors }) {
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
    image_url: null
  })
  const [errors, setErrors] = useState({})
  const [addFlavors, setAddFlavors] = useState(flavors)

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

  const handleImageChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: URL.createObjectURL(e.target.files[0]) }));
  }

  const handleSubmit = async () => {
    addFlavors.forEach(item => form.fav_flavors += item.id)
      
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
      handleUpdateUser(data[0])
      navigate('/profile')
    }
    if (error) {
      console.log(error, "error EditProfile.js")
    }
  }

  /** Multi-Select Library */
  const flavorOptions = [
    {flavor: 'spicy', id: 0},
    {flavor: 'salty', id: 1},
    {flavor: 'sweet', id: 2},
    {flavor: 'sour', id: 3},
    {flavor: 'bitter', id: 4},
    {flavor: 'savory', id: 5},
    {flavor: 'fatty', id: 6}
  ];

  const onSelect = (list, item) => {
    setAddFlavors(list)
  }

  const onRemove = (list, item) => {
    setAddFlavors(list)
  }

  const style = {
    multiselectContainer: {
      width: "200px"
    }
  };
  
  return (
    <div className="EditProfile">
      {!user.email ? 
        <div>Login <Link to="/login">here</Link> to edit your profile page</div> :

        <div className="profile-display">
          <div className="profile-left">
            <div className="profile-img">
              {form.image_url ?
                <img src={form.image_url} alt=""></img> :
                <img src={profile.image_url} alt=""></img>
              }
            </div>
            <div>
              <input
                type="file"
                name="image_url"
                placeholder="image"
                // value={form.image_url}
                onChange={handleImageChange}
              />
            </div>
            <Multiselect
              options={flavorOptions} // Options to display in the dropdown
              selectedValues={flavors}
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue={"flavor"}
              closeIcon={"cancel"}
              style={style}
            />
          </div>
          <div className="profile-right">
            <div className="profile-basic">
              <div className="profile-name">{user.first_name} {user.last_name}</div>
              <div>
                <input
                  type="text"
                  name="region"
                  placeholder="region"
                  value={form.region}
                  onChange={handleInputChange}
                />
              </div>
            </div>
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
              <button className="btn" onClick={handleSubmit}>update</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}