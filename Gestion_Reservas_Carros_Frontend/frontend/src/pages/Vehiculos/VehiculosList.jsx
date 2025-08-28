import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCar } from "react-icons/fa";
import axios from "axios";
import storeAuth from "../../context/storeAuth";

export default function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([]);
  const { token } = storeAuth();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get(
          "https://gesvehiculosbackend-production.up.railway.app/api/vehiculos",
          headers
        );
        setVehiculos(response.data);
      } catch (error) {
        console.error("Error al obtener vehículos:", error);
      }
    };
    fetchVehiculos();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://gesvehiculosbackend-production.up.railway.app/api/vehiculos/${id}`,
        headers
      );
      setVehiculos(vehiculos.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Lista de Vehículos</h2>

      <Link to="/dashboard/vehiculos/create">
        <button style={addButton}>
          <FaCar style={{ marginRight: "8px" }} />
          Nuevo Vehículo
        </button>
      </Link>

      <div style={card}>
        <div style={scrollContainer}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Marca</th>
                <th style={th}>Modelo</th>
                <th style={th}>Año</th>
                <th style={th}>Placa</th>
                <th style={th}>Tipo</th>
                <th style={th}>Kilometraje</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={emptyMessage}>
                    No hay vehículos registrados
                  </td>
                </tr>
              ) : (
                vehiculos.map((v) => (
                  <tr key={v._id} style={tr}>
                    <td style={td}>{v.marca}</td>
                    <td style={td}>{v.modelo}</td>
                    <td style={td}>{v.anio_fabricacion}</td>
                    <td style={td}>{v.placa}</td>
                    <td style={td}>{v.tipo_vehiculo}</td>
                    <td style={td}>{v.kilometraje} km</td>
                    <td style={tdCenter}>
                      <Link to={`/dashboard/vehiculos/edit/${v._id}`}>
                        <button style={editButton}>
                          <FaEdit />
                        </button>
                      </Link>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
                          handleDelete(v._id);
                        }
                      }}
                      style={deleteButton}
                    >
                      <FaTrash />
                    </button>
                    </td>
                  </tr>
                ))
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

const title = {
  marginBottom: "20px",
  fontSize: "2rem",
  color: "#525b6d",
};

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
  tableLayout: "auto",
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
  whiteSpace: "normal",
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
