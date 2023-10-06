import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { TOKEN } from "../../constants";
import Cookies from "js-cookie";

import './Header.scss'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };

  const [burger, setBurger] = useState(false)
  const open = () => {
    if (burger == true) {
      setBurger(false)
    } else {
      setBurger(true)
    }
  }

  return (
    <header className="header">
      <div className="">
        <nav className="header__nav">
          <NavLink to='/' className="header__logo">
            <img src="../../../public/Logo.svg" alt="logo" />
          </NavLink>
          <ul className={`header__menu ${burger ? 'open' : 'close'}`}>
            {
              isAuthenticated && role === "admin" ? (
                <li className="header__menu-item">
                  <NavLink to='/dashboard' className="header__menu-link">Admin</NavLink>
                </li>
              ) : null
            }
            <li className="header__menu-item">
              <NavLink to='/' className="header__menu-link">Home</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/register' className="header__menu-link">Register</NavLink>
            </li>
            {
              isAuthenticated ? (<button className="header__menu-link" onClick={logout}>Logout</button>) : null
            }
            <li className="header__menu-item">
              <ul className="header__sub-menu">
                <li className="header__sub-menu-item">
                  {
                    isAuthenticated ? (<NavLink to='/account' className="header__sub-menu-link">Account</NavLink>) : (<NavLink to='/login' className="header__sub-menu-link">Login</NavLink>)
                  }
                </li>
              </ul>
            </li>
          </ul>
          <button className="burger__btn" onClick={open}><img className="burger__btn-img" src="./png/pngwing.com (2).png" alt="burger btn" /></button>
        </nav>
      </div>
    </header>
  )
}

export default Header