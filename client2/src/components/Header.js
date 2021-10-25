import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./AppContext";
import Logout from "./Log/Logout";
import "../style/Header.css";
import { useSelector } from "react-redux";


const Header = () => {
  const user = useContext(UserContext);
  const userData = useSelector((state)=>state.userReducer)

  return (
    <nav>
      <div className="header-container">
        <div className="logo_nom">
          <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} exact to="/">
            <div className="logo">
              <img src="./logo/logo_site.png" width="40px" height="30px" alt="" />{" "}
              {/* Mettre le logo du site */}
              <h3>InstantApp</h3>
            </div>
          </NavLink>
        </div>
        {user ? (
          <ul className="liste-header">
            <li className="welcome">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} exact to="/profil">
                <h5>Bienvenue {userData.prenom}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul className="liste-header">
            {/* Pas important car utilisateur devrai toujours être connecté */}
            <li>
              <NavLink exact to="/profil">
                <img src="" alt="" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
