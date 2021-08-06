import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Multiselect from "multiselect-react-dropdown";

import tempImg from "../../assets/tempProfileImg.png";
import profileBackground from "../../assets/edit-profile.png";
import "./EditProfile.css";

export default function EditProfile({
  user,
  handleUpdateUser,
  profile
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    password: "",
    passwordConfirm: "",
    short_bio: profile.short_bio,
    region: profile.region,
    fav_flavors: "",
    image_url: "",
  });
  const [errors, setErrors] = useState({});
  const [flavors, setFlavors] = useState("");
  const [image, setImage] = useState("");

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
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    if (e.target.name === "passwordConfirm") {
      if (form.password && form.password !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // check that the password and email fields are valid before registering user
    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    flavors.forEach((item) => (form.fav_flavors += item.id));

    const { data, error } = await apiClient.updateProfile({
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      password: form.password,
      short_bio: form.short_bio,
      region: form.region,
      fav_flavors: form.fav_flavors,
      image_url: form.image_url,
    });
    if (data) {
      handleUpdateUser(data[0]);
      navigate("/profile");
    }
    if (error) {
      console.log(error, "error EditProfile.js");
    }
  };

  /** Multi-Select Library */
  const flavorOptions = [
    { flavor: "spicy", id: 0 },
    { flavor: "salty", id: 1 },
    { flavor: "sweet", id: 2 },
    { flavor: "sour", id: 3 },
    { flavor: "bitter", id: 4 },
    { flavor: "savory", id: 5 },
    { flavor: "fatty", id: 6 },
  ];

  const onSelect = (list, item) => {
    setFlavors(list);
  };

  const onRemove = (list, item) => {
    if (list.length == 0) {
      setFlavors([]);
      return;
    }
    setFlavors(list);
  };

  const allFlavors = [
    "spicy",
    "salty",
    "sweet",
    "sour",
    "bitter",
    "savory",
    "fatty",
  ];
  useEffect(() => {
    if (profile?.fav_flavors) {
        var flavors = [];
        profile.fav_flavors.split("").forEach((c) => {
          let num = Number(c);
          var obj = { flavor: allFlavors[num], id: c };
          flavors.push(obj);
        });
        setFlavors(flavors);
      } else {
        setFlavors([]);
      }
  }, [profile])

  const style = {
    multiselectContainer: {
      fontFamily: "Lato, sans-serif",
      width: "200px",
      margin: "20px",
    },
    searchBox: {
      border: "1px solid #CECECE",
      background: "#fff",
      borderRadius: "10px",
      fontSize: "10px",
      minHeight: "50px",
    },
    inputField: {
      margin: "0px",
      width: "100%",
    },
    optionContainer: {
      background: "#fff",
    },
    option: {
      color: "#000",
    },
    highlightOption: {
      background: "transparent",
      dislay: "none",
    },
    hightlight: {
      background: "transparent",
      dislay: "none",
    },
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "profile");
    // data.append("public_id", profile.user_id)
    // data.append("overwrite", true)
    fetch("https://api.cloudinary.com/v1_1/dkp449p00/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setForm((prevState) => ({ ...prevState, image_url: res.url }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="EditProfile"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      {!user.email ? (
        <div>
          Login <Link to="/login">here</Link> to edit your profile page
        </div>
      ) : (
        <div className="profile-display">
          <div className="profile-left">
            <input
              type="file"
              name="image_url"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="profile-img">
              {form.image_url ? (
                <img src={form.image_url} alt=""></img>
              ) : (
                <>
                  {profile.image_url ? (
                    <img src={profile.image_url} alt="User profile img"></img>
                  ) : (
                    <img src={tempImg} alt="Placeholder img"></img>
                  )}
                </>
              )}
            </div>
            <button className="upload-btn" onClick={uploadImage}>
              Upload
            </button>
            <Multiselect
              options={flavorOptions} // Options to display in the dropdown
              selectedValues={flavors}
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue={"flavor"}
              closeIcon={"cancel"}
            />
          </div>
          <div className="profile-right">
            <div className="profile-basic">
              <div className="profile-name">
                {user.first_name} {user.last_name}
              </div>
            </div>
            <div className="form">
              <div className="form-input">
                <label>region</label>
                <input
                  type="text"
                  name="region"
                  placeholder="region"
                  value={form.region}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input-name">
                <div className="form-input">
                  <label>first name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    value={form.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-input">
                  <label className="form-input">last name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    value={form.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-input">
                <label>email</label>
                <input
                  className={`${errors.email ? `error-border` : ``}`}
                  type="email"
                  name="email"
                  placeholder="email"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="error">{errors.email}</div>
              <div className="form-input">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={form.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label>password</label>
                <input
                  className={`${errors.password ? `error-border` : ``}`}
                  type="password"
                  name="password"
                  placeholder="password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <input
                  className={`${errors.passwordConfirm ? `error-border` : ``}`}
                  type="password"
                  name="passwordConfirm"
                  placeholder="confirm password"
                  value={form.passwordConfirm}
                  onChange={handleInputChange}
                />
              </div>
              {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )}
              <div className="form-input">
                <label>short bio</label>
                <input
                  type="text"
                  name="short_bio"
                  placeholder="add a short bio"
                  value={form.short_bio}
                  onChange={handleInputChange}
                />
              </div>
              <div>{errors.form}</div>
              <button className="update-btn" onClick={handleSubmit}>
                update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
