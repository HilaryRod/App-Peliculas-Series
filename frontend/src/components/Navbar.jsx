import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>HAM</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Películas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/lists" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Mis Listas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
