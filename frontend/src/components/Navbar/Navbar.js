import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import search from '../../assets/search-icon.svg'
import wheel from '../../assets/wheel-icon.svg'
import close from '../../assets/close.svg'

import './Navbar.css'

export default function Navbar() {
  const [isSearch, setIsSearch] = useState(false)

  const handleOnClick = () => {
    isSearch ? setIsSearch(false) : setIsSearch(true)
  }
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
          <input type='text' placeholder='search recipes...'>
          </input>
          <div className="search-btn" onClick={handleOnClick}>
            <img src={close} alt="Close button"></img>
          </div>
          </>
        }
        <Link to='/wheel' className="wheel-link">
          <img src={wheel} alt="Wheel icon"></img>
        </Link>
        <Link to='/login' className="login-link">Login</Link>
      </div>
      
    </div>
  )
}