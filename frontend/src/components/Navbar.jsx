import { Link } from "react-router-dom";
import { useAuth, AuthProvider } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
      </div>

      <ul className="nav-links">
        {user ? (
          <>
            <li><Link to="/" className="nav-link">Inicio</Link></li>
            <li><Link to="/lists" className="nav-link">Mis Listas</Link></li>
            <li><Link to="/perfil" className="nav-link">Perfil</Link></li>
            <li><button className="logout-btn" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Registro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};
