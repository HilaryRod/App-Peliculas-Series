import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rutas.
 * Si no hay token, redirige a /login
 * Si hay token, renderiza los hijos
 */
function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
