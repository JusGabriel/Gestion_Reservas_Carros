// src/pages/Home.jsx
import storeAuth from "../context/storeAuth";

const Home = () => {
  const { userName } = storeAuth();

  return (
    <div style={homeContainer}>
      <h1 style={line1Style}>Sistema de Gestión de Rentas de Carros</h1>
      <h2 style={line2Style}>Administración de Vehículos y Reservas</h2>
      <p style={descriptionStyle}>
        Este sistema permite gestionar de manera eficiente los vehículos disponibles, 
        los clientes y las reservas de renta. Desde el panel lateral podrás navegar por 
        los diferentes módulos y realizar operaciones como registrar, editar o eliminar 
        autos, clientes y contratos de alquiler.
      </p>
    </div>
  );
};

// --- Estilos ---
const homeContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  textAlign: "center",
  padding: "0 2rem",
};

const line1Style = {
  fontSize: "4rem",
  fontWeight: 700,
  color: "#525b6d",
  opacity: 0,
  transform: "translateY(-30px)",
  animation: "fadeIn 1.5s forwards",
};

const line2Style = {
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#525b6d",
  opacity: 0,
  transform: "translateY(-30px)",
  animation: "fadeIn 1.5s forwards",
  animationDelay: "1.6s",
};

const welcomeStyle = {
  fontSize: "1.8rem",
  fontWeight: 500,
  color: "#AA4A44",
  marginTop: "2rem",
  opacity: 0,
  transform: "translateY(-20px)",
  animation: "fadeIn 1.5s forwards",
  animationDelay: "3s",
};

const descriptionStyle = {
  fontSize: "1.1rem",
  color: "#525b6d",
  maxWidth: "700px",
  marginTop: "1rem",
  lineHeight: "1.6",
  opacity: 0,
  transform: "translateY(-15px)",
  animation: "fadeIn 1.5s forwards",
  animationDelay: "1s",
};

// Animación fadeIn
const styleSheet = document.styleSheets[0];
if (![...styleSheet.cssRules].some((r) => r.name === "fadeIn")) {
  styleSheet.insertRule(`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-30px) scale(0.8); }
      50% { opacity: 0.5; transform: translateY(10px) scale(1.05); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }`, styleSheet.cssRules.length);
}

export default Home;

