import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../services/apiClient";
import logo from "../../assets/logo.svg";
import search from "../../assets/search-icon.svg";
import wheel from "../../assets/wheel-icon.svg";
import close from "../../assets/close.svg";
import userlogo from "../../assets/user.svg";

import SearchPage from "../SearchPage/SearchPage";
import "./Navbar.css";

export default function Navbar({ user, setUser, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [isSearch, setIsSearch] = useState(false);
  const [userIsClicked, setUserIsClicked] = useState(false);
  
  const handleOnSearchClick = () => {
    setIsSearch(true)
    navigate("/search");
  };
  
  const handleOnInputClick = () => {
    navigate("/search");
  }

  const handleOnClose = () => {
    setIsSearch(false)
    navigate("/")
  }

  const handleOnUserClick = () => {
    setUserIsClicked(!userIsClicked)
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setUser({});
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    navigate("/searchResults");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate("/searchResults");
  };

  /* https://stackoverflow.com/questions/32553158/detect-click-outside-react-component */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              setIsSearch(false)
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


  return (
    <div className="Navbar">
      <Link to="/" className={`logo-link ${isSearch ? 'phone-view': ''}`}>
        <img src={logo} alt="Reciplan app logo"></img>
      </Link>
      <div className={`navbar-right ${isSearch ? 'phone-view-search': ''}`}>
        {!isSearch ? (
          <div className="search-btn" onClick={handleOnSearchClick}>
            <img src={search} alt="Search icon"></img>
          </div>
        ) : (
          <>
            <div className="search-btn">
              <img src={search} alt="Search icon"></img>
            </div>
            <form onSubmit={handleOnSubmit}>
              <input
                className="search-input"
                type="text"
                placeholder="search recipes..."
                onChange={handleInputChange}
                onClick={handleOnInputClick}
                ref={wrapperRef}
              ></input>
            </form>
            <div className="search-btn" onClick={handleOnClose}>
              <img src={close} alt="Close button"></img>
            </div>
          </>
        )}
        <Link
          to="/wheel"
          className={`wheel-link ${user?.email ? 'margin-right' : ''} ${isSearch ? 'phone-view': ''}`}
        >
          <img src={wheel} alt="Wheel icon"></img>
        </Link>

        {user?.email ? (
          <div className={`user-btn ${isSearch ? 'phone-view': ''}`}>
            <img
              onClick={handleOnUserClick}
              src={userlogo}
              alt="User button"
            ></img>
            {userIsClicked ? (
              <div className="user-drop">
                <Link onClick={handleOnUserClick} to="/profile">
                  profile
                </Link>
                <Link onClick={handleOnUserClick} to="/saved">
                  saved
                </Link>
                <Link onClick={handleLogout} to="/">
                  logout
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <Link to="/login" className={`login-link ${isSearch ? 'phone-view': ''}`}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
