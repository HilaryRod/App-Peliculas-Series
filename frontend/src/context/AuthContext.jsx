import { createContext, useContext, useEffect, useState } from "react";
import { profileRequest } from "../api/auth"; // tus llamadas al backend

// Crear contexto
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // información del usuario
  const [loading, setLoading] = useState(true); // estado de carga inicial

  // Revisar sesión al iniciar la app
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await profileRequest(); // backend usa cookie automáticamente
        setUser(res.data);
      } catch (error) {
        setUser(null); // no hay sesión
        console.log("No hay sesión activa:", error);
      } finally {
        setLoading(false);
      }
    };
    checkProfile();
  }, []);

  // Logout: llama al backend y limpia usuario
  const logout = async () => {
    try {
      //await logoutRequest(); // backend borra cookie
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
    }
  };

  // Login: opcionalmente puedes actualizar user manualmente después de login
  const login = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
