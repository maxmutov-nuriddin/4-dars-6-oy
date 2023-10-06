import { useState } from "react"
import { NavLink } from "react-router-dom"


const Headers = () => {


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
            <img src="../../../../public/Logo.svg" alt="logo" />
          </NavLink>
          <ul className={`header__menu ${burger ? 'open' : 'close'}`}>
            <li className="header__menu-item">
              <NavLink to='/dashboard' className="header__menu-link">Admin</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/skills' className="header__menu-link">Skills</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/users' className="header__menu-link">Users</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/' className="header__menu-link">Go back</NavLink>
            </li>
          </ul>
          <button className="burger__btn" onClick={open}><img className="burger__btn-img" src="./png/pngwing.com (2).png" alt="burger btn" /></button>
        </nav>
      </div>
    </header>
  )
}

export default Headers