import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../assets/logo.png";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.password) {
      setError("Por favor llena todos los campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");

    // Backend/servicio de registro
    console.log("Datos de registro:", formData);
  };

  return (
    <div className="container">
      {/* Logo arriba */}
      <img src={logo} alt="Logo" className="logo" />

      <h2>Crea tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Mensaje de error */}
        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">Registrarme</button>
      </form>

      <p className="aux">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
