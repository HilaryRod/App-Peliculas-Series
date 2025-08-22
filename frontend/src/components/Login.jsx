import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // estilos compartidos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de login:", { email, password });
  };

  return (
    <div className="container">
        <img src="/public/logo.png" alt="Logo" className = "logo" />

      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
      <p className="aux">
        ¿No tienes cuenta?{" "}
        <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;

