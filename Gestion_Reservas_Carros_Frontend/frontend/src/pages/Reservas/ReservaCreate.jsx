// src/pages/reservas/ReservaCreate.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import storeAuth from "../../context/storeAuth";
import { FaSave } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ReservaCreate = () => {
  const navigate = useNavigate();
  const { token } = storeAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClientes = await fetch(
          "https://gestionmatriculas-production.up.railway.app/api/clientes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataClientes = await resClientes.json();
        setClientes(dataClientes);

        const resVehiculos = await fetch(
          "https://gestionmatriculas-production.up.railway.app/api/vehiculos",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataVehiculos = await resVehiculos.json();
        setVehiculos(dataVehiculos);
      } catch (error) {
        toast.error("Error cargando clientes o vehículos");
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  const createReserva = async (data) => {
    try {
      const response = await fetch(
        "https://gestionmatriculas-production.up.railway.app/api/reservas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            codigo: data.codigo,
            descripcion: data.descripcion,
            clienteId: data.clienteId,
            vehiculoId: data.vehiculoId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.msg || "Error al crear la reserva");
        return;
      }

      toast.success("Reserva creada con éxito");
      setTimeout(() => navigate("/dashboard/reservas"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Crear Reserva</h2>
        <form onSubmit={handleSubmit(createReserva)} style={formStyle}>
          <div style={inputGroup}>
            <label style={label}>Código</label>
            <input
              type="number"
              placeholder="Código de la reserva"
              {...register("codigo", {
                required: "El código es obligatorio",
                min: { value: 1, message: "Código inválido" },
              })}
              style={inputStyle}
            />
            {errors.codigo && <p style={errorText}>{errors.codigo.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Descripción</label>
            <input
              type="text"
              placeholder="Descripción de la reserva"
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                minLength: { value: 5, message: "Descripción demasiado corta" },
              })}
              style={inputStyle}
            />
            {errors.descripcion && <p style={errorText}>{errors.descripcion.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Cliente</label>
            <select
              {...register("clienteId", { required: "Debe seleccionar un cliente" })}
              style={inputStyle}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nombre} {c.apellido}
                </option>
              ))}
            </select>
            {errors.clienteId && <p style={errorText}>{errors.clienteId.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Vehículo</label>
            <select
              {...register("vehiculoId", { required: "Debe seleccionar un vehículo" })}
              style={inputStyle}
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.marca} {v.modelo} ({v.placa})
                </option>
              ))}
            </select>
            {errors.vehiculoId && <p style={errorText}>{errors.vehiculoId.message}</p>}
          </div>

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilos
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

const title = { marginBottom: "2rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };
const inputGroup = { display: "flex", flexDirection: "column" };
const label = { marginBottom: "0.5rem", fontWeight: "600", color: "#525b6d" };
const inputStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#1E1E2F",
  fontSize: "1.1rem",
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
const errorText = { color: "#E04A4A", fontSize: "0.9rem", marginTop: "0.3rem" };

export default ReservaCreate;
