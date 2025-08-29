import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Lists from "./components/Lists";
import Profile from "./components/Profile"; 
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

// Layout con Navbar
function Layout({ token }) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet context={{ token }} />
      </main>
    </>
  );
}

function App() {
  const [token, setToken] = useState(null);

  // Leer token al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* Register */}
        <Route path="/register" element={<Register setToken={setToken} />} />

        <Route element={<Layout token={token} />}>
          {/* Ruta protegida: "/" */}
          {/* Home */}
          <Route
            index
            element={
              <ProtectedRoute token={token}>
                <Home token={token}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute token={token}>
                <Home token={token}/>
              </ProtectedRoute>
            }
          />
          {/* Listas */}
          <Route
            path="/lists"
            element={
              <ProtectedRoute token={token}>
                <Lists />
              </ProtectedRoute>
            }
          />
          {/* Perfil */}
          {/*<Route
            path="/perfil"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        </Route>

        {/* Página no encontrada */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

