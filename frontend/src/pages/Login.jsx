import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "../styles/style.css";
function Login() {
  const {setUser}=useAuth()
  const {
    register,
    handleSubmit,
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
    const res = await loginRequest(data); 
    setUser(res.data.user);               // user viene del backend

    setApiSuccess("Login exitoso, redirigiendo...");
    reset();
    setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.log("Error login:", err.response?.data || err);
      setApiError(err.response?.data?.message || "Error en el login");
    }
  };

  return (
    <div className="container">
      <img src="./logo.png" alt="Logo" className = "logo" />
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


