// src/pages/auth/Login.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import storeAuth from "../../context/storeAuth";
import { useEffect, useState } from "react";
import GatoImage from "../../assets/estudios.jpg";

const Login = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // al cargar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setToken, setId, setUserName, setRol, token } = storeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const loginUser = async (data) => {
    try {
      const response = await fetch(
        "https://gestionmatriculas-production.up.railway.app/api/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setToken(result.token);
        setId(result.usuario.id);
        setUserName(result.usuario.nombre);
        setRol(result.usuario.rol);

        toast.success(result.msg || "¡Bienvenido!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(result.msg || "Ups! Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error de conexión con el servidor.");
    }
  };

  return (
    <div style={{ ...container, flexDirection: isMobile ? "column" : "row" }}>
      <ToastContainer />
      <div
        style={{
          ...loginBox,
          width: isMobile ? "100%" : "50%",
          height: isMobile ? "100vh" : "100%",
        }}
      >
        <h2 style={title}>Hola de nuevo</h2>
        <p style={subtitle}>Ingresa tus datos para continuar con tu cuenta.</p>
        <form onSubmit={handleSubmit(loginUser)} style={formStyle}>
          <label style={label}>Correo electrónico</label>
          <input
            type="email"
            placeholder="Escribe tu correo"
            {...register("email", {
              required: "Por favor ingresa tu correo",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo inválido",
              },
            })}
            style={inputStyle}
          />
          {errors.email && <p style={errorText}>{errors.email.message}</p>}

          <label style={label}>Contraseña</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            {...register("password", {
              required: "Por favor ingresa tu contraseña",
              minLength: {
                value: 3,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            style={inputStyle}
          />
          {errors.password && <p style={errorText}>{errors.password.message}</p>}

          <button type="submit" style={buttonStyle}>
            Iniciar sesión
          </button>
        </form>
      </div>

      {!isMobile && (
        <div style={imageBox}>
          <img src={GatoImage} alt="Estudios" style={imageStyle} />
        </div>
      )}

      <div style={animatedBackground}></div>
    </div>
  );
};

// --- Estilos ---
const container = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const loginBox = {
  zIndex: 2,
  padding: "3rem",
  borderRadius: "0",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  color: "#fff",
  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const imageBox = {
  zIndex: 2,
  width: "50%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "0",
};

const title = {
  fontSize: "2rem",
  marginBottom: "0.5rem",
  textAlign: "center",
  width: "100%",
};

const subtitle = {
  fontSize: "0.9rem",
  marginBottom: "2rem",
  color: "#ddd",
  textAlign: "center",
  width: "100%",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "80%",
};

const label = { fontWeight: 600 };

const inputStyle = {
  padding: "0.8rem",
  borderRadius: "0",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "#fff",
};

const buttonStyle = {
  padding: "0.8rem",
  borderRadius: "0",
  border: "none",
  background: "#AA4A44",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "1rem",
  transition: "0.3s",
};

const errorText = { color: "#ff6b6b", fontSize: "0.8rem" };

const animatedBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(-45deg, #FFA500, #360c27ff, #2B2D42, #3e4b83ff)",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  zIndex: 1,
};

const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes gradient {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Login;

