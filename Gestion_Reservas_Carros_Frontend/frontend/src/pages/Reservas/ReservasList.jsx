// src/pages/reservas/ReservasList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import storeAuth from "../../context/storeAuth";

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const { token } = storeAuth();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(
          "https://gesvehiculosbackend-production.up.railway.app/api/reservas",
          headers
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://gesvehiculosbackend-production.up.railway.app/api/reservas/${id}`,
        headers
      );
      setReservas(reservas.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Lista de Reservas</h2>

      <Link to="/dashboard/reservas/create">
        <button style={addButton}>
          <FaClipboardList style={{ marginRight: "8px" }} />
          Nueva Reserva
        </button>
      </Link>

      <div style={tableContainer}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Código</th>
              <th style={th}>Descripción</th>
              <th style={th}>Cliente ID</th>
              <th style={th}>Vehículo ID</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
            <tr key={r._id} style={tr}>
              <td style={td}>{r.codigo}</td>
              <td style={td}>{r.descripcion}</td>
              <td style={td}>{r.cliente?.nombre} {r.cliente?.apellido}</td>
              <td style={td}>{r.vehiculo?.marca} {r.vehiculo?.modelo} ({r.vehiculo?.placa})</td>
              <td style={tdCenter}>
                <Link to={`/dashboard/reservas/edit/${r._id}`}>
                  <button style={editButton}>
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
                      handleDelete(r._id);
                    }
                  }}
                  style={deleteButton}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
            {reservas.length === 0 && (
              <tr>
                <td colSpan="5" style={emptyMessage}>
                  No hay reservas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Estilos ---
const container = {
  padding: "20px",
  background: "#f9fafb",
  minHeight: "100vh",
  color: "#1E1E2F",
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

const tableContainer = {
  overflowX: "auto",
  borderRadius: "12px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "800px",
  background: "#fff",
  borderRadius: "12px",
  tableLayout: "fixed",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
  color: "#1E1E2F",
  textAlign: "center",
  wordBreak: "break-word",
};

const tdCenter = {
  ...td,
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const editButton = {
  padding: "6px 12px",
  background: "#4A90E2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const deleteButton = {
  padding: "6px 12px",
  background: "#E04A4A",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const emptyMessage = {
  textAlign: "center",
  padding: "20px",
  color: "#777",
};

export default ReservasList;
