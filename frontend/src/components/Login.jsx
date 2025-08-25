import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./style.css";
import logo from "../assets/logo.png";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [apiError, setApiError] = React.useState("");
  const [apiSuccess, setApiSuccess] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError("");
      setApiSuccess("");

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error en el login ❌");

      localStorage.setItem("token", result.token);
      setApiSuccess("✅ Login exitoso, redirigiendo...");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setApiError(err.message || "No se pudo conectar al servidor 🚨");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Inicia sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "El correo no es válido",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Validando..." : "Entrar"}
        </button>
      </form>

      {apiError && <p className="error">{apiError}</p>}
      {apiSuccess && <p className="success">{apiSuccess}</p>}

      <p className="aux">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;


