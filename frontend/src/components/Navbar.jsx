import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
     <img src={logo} alt="Logo" className="logo" />
      <h1 className="logo">HAM</h1>
      <ul className="nav-links">
        <li><Link to="/Home">Inicio</Link></li>
        <li><Link to="/Movies">Películas</Link></li>
        <li><Link to="/Lists">Mis Listas</Link></li>
        <li><Link to="/Profile">Perfil</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
