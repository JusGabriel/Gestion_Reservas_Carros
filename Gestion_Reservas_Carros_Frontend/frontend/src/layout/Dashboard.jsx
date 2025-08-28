import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import storeAuth from "../context/storeAuth";
import { useEffect, useState } from "react";
import { FaUserCircle, FaCar, FaClipboardList, FaHome, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const { token, setToken, setId, userName } = storeAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const logout = () => {
    setToken(null);
    setId(null);
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Clientes", path: "/dashboard/clientes", icon: <FaUserCircle /> },
    { name: "Vehículos", path: "/dashboard/vehiculos", icon: <FaCar /> },
    { name: "Reservas", path: "/dashboard/reservas", icon: <FaClipboardList /> },
  ];

  return (
    <div style={{ ...dashboardContainer, flexDirection: isMobile ? "column" : "row" }}>
      {/* Sidebar */}
      <aside
        style={{
          ...sidebarStyle,
          width: isMobile ? "100%" : collapsed ? "80px" : "240px",
          height: isMobile ? "auto" : "100vh",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "stretch",
          justifyContent: isMobile ? "space-around" : "space-between",
          padding: isMobile ? "0.5rem 0" : "1.5rem 1rem",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: isMobile ? "center" : collapsed ? "center" : "space-between",
          alignItems: "center",
          width: "100%",
        }}>
          {!collapsed && !isMobile && <h2 style={sidebarTitle}>RentaFácil</h2>}
          {isMobile && <h2 style={{ ...sidebarTitle, fontSize: "1rem", margin: 0 }}>RentaFácil</h2>}
          {!isMobile && <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: "transparent", border: "none", color: "#fff", fontSize: "1.3rem", cursor: "pointer" }}
          >
            <FaBars />
          </button>}
        </div>

        <nav style={{
          ...navListStyle,
          flexDirection: isMobile ? "row" : "column",
          gap: isMobile ? "0.5rem" : "0.7rem",
          overflowY: "visible",
          justifyContent: isMobile ? "center" : "flex-start",
          width: "100%",
        }}>
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                ...linkStyle,
                justifyContent: "center",
                backgroundColor: location.pathname === link.path ? "#374151" : "transparent",
                fontWeight: location.pathname === link.path ? 600 : 500,
                flexDirection: "column",
                padding: isMobile ? "0.3rem 0.5rem" : "0.6rem 1rem",
                borderRadius: "6px",
              }}
            >
              <span style={iconStyle}>{link.icon}</span>
              {(!collapsed || isMobile) && <span style={{ fontSize: isMobile ? "0.7rem" : "1rem" }}>{link.name}</span>}
            </Link>
          ))}
        </nav>

        <div style={{
          ...profileBox,
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          width: isMobile ? "auto" : "100%",
          paddingTop: isMobile ? "0" : "1rem",
          borderTop: isMobile ? "none" : "1px solid rgba(255,255,255,0.2)"
        }}>
          <FaUserCircle style={profileIcon} />
          {!collapsed && <p style={profileName}>{userName || "Usuario"}</p>}
          <button style={logoutButton} onClick={logout}><FiLogOut /></button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div style={{
        ...mainContainer,
        marginLeft: isMobile ? 0 : collapsed ? "80px" : "240px",
        marginTop: isMobile ? "100px" : 0
      }}>
        <header style={headerStyle}>
          <h1 style={welcomeStyle}>Bienvenido - {userName || "Usuario"}</h1>
        </header>

        <main style={mainContent}>
          <Outlet />
        </main>

        <footer style={footerStyle}>
          <p>© {new Date().getFullYear()} Sistema Académico. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

// --- Estilos originales se mantienen igual, no se toca nada más ---
const dashboardContainer = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Roboto', 'Inter', sans-serif",
  background: "#f4f5f7",
  color: "#333",
};

const sidebarStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#fff",
  boxShadow: "3px 0 15px rgba(0,0,0,0.2)",
  position: "fixed",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(-45deg, #FFA500, #360c27ff, #2B2D42, #3e4b83ff)",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  transition: "width 0.3s ease",
};

const sidebarTitle = {
  textAlign: "center",
  marginBottom: "1.5rem",
  fontSize: "1.45rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  color: "#fff"
};

const navListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.7rem",
  overflowY: "auto",
  maxHeight: "calc(100vh - 220px)",
  paddingRight: "0.5rem"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  transition: "all 0.25s ease",
};

const iconStyle = { width: "20px", height: "20px", display: "flex", justifyContent: "center" };

const profileBox = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingTop: "1rem",
  borderTop: "1px solid rgba(255,255,255,0.2)"
};

const profileIcon = { width: "40px", height: "40px", color: "#fff" };
const profileName = { margin: 0, fontWeight: 600 };
const logoutButton = {
  padding: "0.4rem 0.6rem",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: "0.3rem",
  transition: "all 0.2s ease-in-out"
};

const mainContainer = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "margin-left 0.3s ease",
};

const headerStyle = {
  padding: "1.5rem 2rem",
  background: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "sticky",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 20
};

const welcomeStyle = { fontSize: "1.25rem", fontWeight: 600, color: "#111" };

const mainContent = {
  flex: 1,
  background: "#f9fafb",
  minHeight: "calc(100vh - 140px)",
  overflow: "auto",
  padding: "1rem 2rem"
};

const footerStyle = {
  padding: "1rem 2rem",
  background: "#fff",
  textAlign: "center",
  color: "#6B7280",
  borderTop: "1px solid #E5E7EB"
};

// Animación fondo sidebar
const styleSheet = document.styleSheets[0];
if (![...styleSheet.cssRules].some(r => r.name === "gradient")) {
  styleSheet.insertRule(`
  @keyframes gradient {
    0% {background-position: 0% 50%; }
    50% {background-position: 100% 50%; }
    100% {background-position: 0% 50%; }
  }`, styleSheet.cssRules.length);
}

export default Dashboard;

