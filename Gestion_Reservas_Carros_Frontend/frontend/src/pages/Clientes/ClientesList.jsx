import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import storeAuth from "../../context/storeAuth";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const { token } = storeAuth();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/estudiantes",
          headers
        );
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://gestionmatriculas-production.up.railway.app/api/estudiantes/${id}`,
        headers
      );
      setClientes(clientes.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Lista de Clientes</h2>

      <Link to="/dashboard/clientes/create">
        <button style={addButton}>
          <FaUserPlus style={{ marginRight: "8px" }} />
          Nuevo Cliente
        </button>
      </Link>

      <div style={card}>
        <div style={scrollContainer}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Nombre</th>
                <th style={th}>Apellido</th>
                <th style={th}>Cédula</th>
                <th style={th}>Fecha Nacimiento</th>
                <th style={th}>Ciudad</th>
                <th style={th}>Dirección</th>
                <th style={th}>Teléfono</th>
                <th style={th}>Email</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((e) => (
                <tr key={e._id} style={tr}>
                  <td style={td}>{e.nombre}</td>
                  <td style={td}>{e.apellido}</td>
                  <td style={td}>{e.cedula || "-"}</td>
                  <td style={td}>{e.fecha_nacimiento.split("T")[0]}</td>
                  <td style={td}>{e.ciudad || "-"}</td>
                  <td style={td}>{e.direccion || "-"}</td>
                  <td style={td}>{e.telefono || "-"}</td>
                  <td style={td}>{e.email || "-"}</td>
                  <td style={tdCenter}>
                    <Link to={`/dashboard/clientes/edit/${e._id}`}>
                      <button style={editButton}><FaEdit /></button>
                    </Link>
                    <button
                      onClick={() => handleDelete(e._id)}
                      style={deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td colSpan="9" style={emptyMessage}>
                    No hay clientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Estilos ---
const container = {
  padding: "20px",
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const title = { marginBottom: "20px", fontSize: "2rem", color: "#525b6d" };
const addButton = {
  marginBottom: "20px",
  padding: "10px 20px",
  background: "#525b6d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

const scrollContainer = {
  overflowX: "auto",
  maxWidth: "100%",
};

const table = {
  width: "100%",
  minWidth: "900px",
  borderCollapse: "collapse",
  tableLayout: "auto", // Cambiado para permitir texto largo
};

const th = {
  padding: "14px 12px",
  color: "#525b6d",
  textAlign: "center",
  background: "#e8eaf0",
  fontWeight: "600",
};

const tr = {
  borderBottom: "1px solid #ddd",
  transition: "0.2s",
};

const td = {
  padding: "12px 10px",
  textAlign: "center",
  whiteSpace: "normal", // permite envolver el texto
  wordBreak: "break-word", // quiebra texto largo
};

const tdCenter = { ...td, display: "flex", justifyContent: "center", gap: "10px" };
const editButton = { padding: "6px 12px", background: "#4A90E2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" };
const deleteButton = { padding: "6px 12px", background: "#E04A4A", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" };
const emptyMessage = { textAlign: "center", padding: "20px", color: "#777" };
