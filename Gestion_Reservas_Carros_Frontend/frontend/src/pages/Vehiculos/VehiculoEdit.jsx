import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storeAuth from "../../context/storeAuth";
import axios from "axios";

export default function VehiculoEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = storeAuth();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio_fabricacion: "",
    placa: "",
    color: "",
    tipo_vehiculo: "",
    kilometraje: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(true);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // --- Cargar vehículo existente ---
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get(
          `https://gesvehiculosbackend-production.up.railway.app/api/vehiculos`,
          headers
        );

        const vehiculo = response.data.find((v) => v._id === id);
        if (!vehiculo) {
          toast.error("Vehículo no encontrado");
          navigate("/dashboard/vehiculos");
          return;
        }

        setForm({
          marca: vehiculo.marca || "",
          modelo: vehiculo.modelo || "",
          anio_fabricacion: vehiculo.anio_fabricacion || "",
          placa: vehiculo.placa || "",
          color: vehiculo.color || "",
          tipo_vehiculo: vehiculo.tipo_vehiculo || "",
          kilometraje: vehiculo.kilometraje || "",
          descripcion: vehiculo.descripcion || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar datos del vehículo");
        console.error(error);
      }
    };

    fetchVehiculos();
  }, [id, token, navigate]);

  // --- Manejo de cambios en inputs ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Actualizar vehículo ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://gestionmatriculas-production.up.railway.app/api/vehiculos/${id}`,
        {
          ...form,
          anio_fabricacion: parseInt(form.anio_fabricacion, 10),
          kilometraje: parseFloat(form.kilometraje),
        },
        headers
      );

      toast.success("Vehículo actualizado con éxito");
      setTimeout(() => navigate("/dashboard/vehiculos"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error al actualizar el vehículo");
      console.error(error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem", color: "#525b6d" }}>Cargando vehículo...</p>;

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Editar Vehículo</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="number"
            name="anio_fabricacion"
            placeholder="Año de fabricación"
            value={form.anio_fabricacion}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={form.placa}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="tipo_vehiculo"
            placeholder="Tipo de Vehículo"
            value={form.tipo_vehiculo}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="number"
            name="kilometraje"
            placeholder="Kilometraje"
            value={form.kilometraje}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Estilos ---
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "2rem",
  background: "#f4f5f7",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formWrapper = {
  width: "100%",
  maxWidth: "700px",
  background: "#fff",
  padding: "3rem",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  color: "#1E1E2F",
};

const title = { marginBottom: "2.5rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };

const inputStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#1E1E2F",
  fontSize: "1.1rem",
  width: "100%",
  transition: "0.2s",
};

const buttonStyle = {
  padding: "1rem",
  background: "#525b6d",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
};
buttonStyle[':hover'] = { background: "#434b5a" };
