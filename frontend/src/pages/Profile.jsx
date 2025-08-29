import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile({ token }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Traer info del usuario desde backend usando el token
  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(() => setUserData(null));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!userData) return <p>Cargando información...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        {userData.avatar && <img src="/assets/oso.png" alt="Avatar" className="avatar" />}
        <button className="btn" onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Profile;
