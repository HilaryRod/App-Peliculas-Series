import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import "./style.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [apiError, setApiError] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError("");

      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Error en el registro ❌");

      console.log("Respuesta del backend:", result);
      navigate("/login"); // Redirige al login
    } catch (error) {
      console.error("Error:", error);
      setApiError(error.message || "No se pudo conectar al servidor 🚨");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Crea tu cuenta</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre completo"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            maxLength: {
              value: 50,
              message: "El nombre no puede tener más de 50 caracteres",
            },
          })}
        />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}

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
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirmar contraseña"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      {apiError && <p className="error">{apiError}</p>}

      <p className="aux">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;

