import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import "../styles/style.css";
import { registerRequest } from "../api/auth"; 
import { useAuth } from "../context/AuthContext";

function Register() {
  const {setUser}=useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [apiError, setApiError] = React.useState("");
  const [apiSuccess, setApiSuccess] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError("");
      setApiSuccess("");
      //endpoint
      const res = await registerRequest({
        username: data.nombre, 
        email: data.email,
        password: data.password,
      });

      setUser(res.data);

      setApiSuccess("Usuario registrado, redirigiendo...");
      reset();
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.log("Error register:", error.response?.data || error);
      setApiError(error.response?.data?.message || "No se pudo registrar 🚨");
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
          {...register("nombre", { required: "El nombre es obligatorio" })}
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
              message: "Debe tener al menos 6 caracteres",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, //se actualizo el regex para permitir todos los simbolos 
              message: "Debe incluir mayúscula, número y símbolo",
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
      {apiSuccess && <p className="success">{apiSuccess}</p>}

      <p className="aux">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;


