import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from "../../services/apiClient"
import logo from '../../assets/logo.svg'
import search from '../../assets/search-icon.svg'
import wheel from '../../assets/wheel-icon.svg'
import close from '../../assets/close.svg'
import userlogo from '../../assets/user.svg'

import './Navbar.css'

export default function Navbar({ user, setUser }) {
  const [isSearch, setIsSearch] = useState(false)

  const handleOnClick = () => {
    isSearch ? setIsSearch(false) : setIsSearch(true)
  }

  const handleLogout = async () => {
    await apiClient.logout();
    setUser({});
  };  
  return (
    <div className="Navbar">
      <Link to='/' className="logo-link">
        <img src={logo} alt="Reciplan app logo"></img>
      </Link>
      <div className="navbar-right">
        {!isSearch ? 
          <div className="search-btn" onClick={handleOnClick}>
            <img src={search} alt="Search icon"></img>
          </div>
          : 
          <>
          <div className="search-btn">
            <img src={search} alt="Search icon"></img>
          </div>
          <input className="search-input" type='text' placeholder='search recipes...'>
          </input>
          <div className="search-btn" onClick={handleOnClick}>
            <img src={close} alt="Close button"></img>
          </div>
          </>
        }
        <Link to='/wheel' className="wheel-link">
          <img src={wheel} alt="Wheel icon"></img>
        </Link>

        {user?.email ?
          <div onClick={handleLogout} className="user-btn">
            <img src={userlogo} alt='User button'></img>
          </div>
          
          : 
          <Link to='/login' className="login-link">Login</Link>
        }
      </div>
      
    </div>
  )
}
