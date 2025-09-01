import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { profileRequest, logoutRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const {user, setUser} = useAuth();
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await profileRequest(); // Llamada al backend
        setUser(res.data.user);            // Actualizamos el contexto
        setLoading(false);
      } catch (err) {
        console.log("Error fetching profile:", err.response?.data || err);
        setApiError("No se pudo cargar la información del usuario");
        setLoading(false);
      }
    };

     if (!user) fetchProfile();
    else setLoading(false);
  }, [setUser, user]);

  const handleLogout = async () => {
    try {
      await logoutRequest();       // Llamada al backend para cerrar sesión
      setUser(null);               // Limpiamos el contexto
      navigate("/login");          // Redirigimos al login
    } catch (err) {
      console.log("Error logout:", err);
    }
  };

  if (loading) return <p>Cargando información...</p>;
  if (apiError) return <p className="error">{apiError}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Creado:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
         <p><strong>Última actualización:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
        <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Profile;
