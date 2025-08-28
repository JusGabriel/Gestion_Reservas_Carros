// src/pages/reservas/ReservaEdit.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSave } from "react-icons/fa";
import storeAuth from "../../context/storeAuth";
import axios from "axios";

const ReservaEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { token } = storeAuth();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traer clientes
        const resClientes = await axios.get(
          "https://gesvehiculosbackend-production.up.railway.app/api/clientes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientes(resClientes.data);

        // Traer vehículos
        const resVehiculos = await axios.get(
          "https://gesvehiculosbackend-production.up.railway.app/api/vehiculos",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVehiculos(resVehiculos.data);

        // Traer reserva específica
        const resReservas = await axios.get(
          "https://gesvehiculosbackend-production.up.railway.app/api/reservas",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const reserva = resReservas.data.find(r => r._id === id);

        if (!reserva) {
          toast.error("Reserva no encontrada");
          navigate("/dashboard/reservas");
          return;
        }

        // Llenar formulario
        setValue("codigo", reserva.codigo);
        setValue("descripcion", reserva.descripcion);
        setValue("clienteId", reserva.clienteId);
        setValue("vehiculoId", reserva.vehiculoId);

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar datos de la reserva");
        console.error(error);
      }
    };

    fetchData();
  }, [id, token, setValue, navigate]);

  const updateReserva = async (data) => {
    try {
      await axios.put(
        `https://gesvehiculosbackend-production.up.railway.app/api/reservas/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reserva actualizada con éxito");
      setTimeout(() => navigate("/dashboard/reservas"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error al actualizar la reserva");
      console.error(error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando reserva...</p>;

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Editar Reserva</h2>
        <form onSubmit={handleSubmit(updateReserva)} style={formStyle}>
          <input
            type="text"
            placeholder="Código"
            {...register("codigo", { required: "El código es obligatorio" })}
            style={inputStyle}
          />
          {errors.codigo && <p style={errorText}>{errors.codigo.message}</p>}

          <input
            type="text"
            placeholder="Descripción"
            {...register("descripcion", { required: "La descripción es obligatoria" })}
            style={inputStyle}
          />
          {errors.descripcion && <p style={errorText}>{errors.descripcion.message}</p>}

          <select
            {...register("clienteId", { required: "El cliente es obligatorio" })}
            style={inputStyle}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(cli => (
              <option key={cli._id} value={cli._id}>{cli.nombre} {cli.apellido}</option>
            ))}
          </select>
          {errors.clienteId && <p style={errorText}>{errors.clienteId.message}</p>}

          <select
            {...register("vehiculoId", { required: "El vehículo es obligatorio" })}
            style={inputStyle}
          >
            <option value="">Seleccione un vehículo</option>
            {vehiculos.map(veh => (
              <option key={veh._id} value={veh._id}>{veh.marca} {veh.modelo} ({veh.placa})</option>
            ))}
          </select>
          {errors.vehiculoId && <p style={errorText}>{errors.vehiculoId.message}</p>}

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Actualizar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Estilos ---
const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
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
};

const errorText = { color: "#E04A4A", fontSize: "0.9rem" };

export default ReservaEdit;
