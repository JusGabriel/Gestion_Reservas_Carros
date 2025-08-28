// src/pages/cliente/ClienteEdit.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSave } from "react-icons/fa";
import storeAuth from "../../context/storeAuth";
import axios from "axios";

const ClienteEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { token } = storeAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/clientes",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const cliente = response.data.find(e => e._id === id);
        if (!cliente) {
          toast.error("Cliente no encontrado");
          navigate("/dashboard/Clientes");
          return;
        }

        // Llenar formulario
        setValue("nombre", cliente.nombre);
        setValue("apellido", cliente.apellido);
        setValue("fecha_nacimiento", cliente.fecha_nacimiento?.split("T")[0] || "");
        setValue("cedula", cliente.cedula || "");
        setValue("ciudad", cliente.ciudad || "");
        setValue("direccion", cliente.direccion || "");
        setValue("telefono", cliente.telefono || "");
        setValue("email", cliente.email || "");

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar datos del cliente");
        console.error(error);
      }
    };

    fetchCliente();
  }, [id, token, setValue, navigate]);

  const updateCliente = async (data) => {
    try {
      await axios.put(
        `https://gestionmatriculas-production.up.railway.app/api/clientes/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Cliente actualizado con éxito");
      setTimeout(() => navigate("/dashboard/clientes"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      console.error(error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando cliente...</p>;

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Editar Cliente</h2>
        <form onSubmit={handleSubmit(updateCliente)} style={formStyle}>
          <input type="text" placeholder="Nombre" {...register("nombre", { required: "El nombre es obligatorio" })} style={inputStyle} />
          {errors.nombre && <p style={errorText}>{errors.nombre.message}</p>}

          <input type="text" placeholder="Apellido" {...register("apellido", { required: "El apellido es obligatorio" })} style={inputStyle} />
          {errors.apellido && <p style={errorText}>{errors.apellido.message}</p>}

          <input type="date" {...register("fecha_nacimiento", { required: "La fecha de nacimiento es obligatoria" })} style={inputStyle} />
          {errors.fecha_nacimiento && <p style={errorText}>{errors.fecha_nacimiento.message}</p>}

          <input type="text" placeholder="Cédula" {...register("cedula")} style={inputStyle} />
          <input type="text" placeholder="Ciudad" {...register("ciudad")} style={inputStyle} />
          <input type="text" placeholder="Dirección" {...register("direccion")} style={inputStyle} />
          <input type="text" placeholder="Teléfono" {...register("telefono")} style={inputStyle} />
          <input type="email" placeholder="Email" {...register("email")} style={inputStyle} />

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Estilos ---
const container = { minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem", background: "#f4f5f7", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const formWrapper = { width: "100%", maxWidth: "900px", background: "#fff", padding: "3rem", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", color: "#1E1E2F" };
const title = { marginBottom: "2.5rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };
const inputStyle = { padding: "1rem", borderRadius: "10px", border: "1px solid #ccc", background: "#f9f9f9", color: "#1E1E2F", fontSize: "1.1rem", width: "100%" };
const buttonStyle = { padding: "1rem", background: "#525b6d", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" };
const errorText = { color: "#E04A4A", fontSize: "0.9rem" };

export default ClienteEdit;
