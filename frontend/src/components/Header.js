import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Header({ isLoggedIn, userEmail, setIsLoggedIn }) {
  const location = useLocation();
 const navigate =useNavigate();
 const [isActiveMenu, setActiveMenu] = React.useState(false)

 function handleActiveMenu () {
  setActiveMenu(!isActiveMenu);
 }
 function handleLogOut () {
  
}
  function signOut() {
    auth.logOut()
    .then(() => { 
      setIsLoggedIn(false);
      navigate("/sign-in", { replace: true })
      setActiveMenu(false);
      handleLogOut()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  const pathLink = location.pathname === "/sign-up" ? "/sign-in" : "/sign-up";

  return (
    <header className= {`header ${isActiveMenu ? "header_active" :""}`}>
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {!isLoggedIn ? (
        <Link to={pathLink} className="header__link">
          {location.pathname === "/sign-up" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <>
        <div className={`header__wrap ${isActiveMenu ? "header__wrap_active" : ""}`}>
          <p className="header__userEmail">{userEmail}</p>
          <Link to="/sign-in" 
          className="header__link header__link_signOut"
          onClick={signOut}>Выйти</Link>
        </div>
        <button className={`${!isActiveMenu ? "header__burger" : "header__close_button"}`}
          onClick={handleActiveMenu}>
          {!isActiveMenu && <span className="header__burger-line"></span>}
        </button>
        </>
      )}
    </header>
  );
}

export default Header;
