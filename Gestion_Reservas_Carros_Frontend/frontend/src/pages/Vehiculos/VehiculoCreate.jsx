// src/pages/vehiculos/VehiculoCreate.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import storeAuth from "../../context/storeAuth";
import { FaSave } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const VehiculoCreate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = storeAuth();
  const navigate = useNavigate();

  const createVehiculo = async (data) => {
    try {
      const response = await fetch(
        "https://gestionmatriculas-production.up.railway.app/api/vehiculos", // <-- Cambiar si usas otro endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            marca: data.marca,
            modelo: data.modelo,
            anio_fabricacion: parseInt(data.anio_fabricacion, 10),
            placa: data.placa,
            color: data.color,
            tipo_vehiculo: data.tipo_vehiculo,
            kilometraje: parseFloat(data.kilometraje),
            descripcion: data.descripcion,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.msg || "Error al crear el vehículo");
        return;
      }

      toast.success("Vehículo creado con éxito");
      setTimeout(() => navigate("/dashboard/vehiculos"), 1500);

    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Registrar Vehículo</h2>
        <form onSubmit={handleSubmit(createVehiculo)} style={formStyle}>
          <div style={row}>
            <InputField
              label="Marca"
              name="marca"
              register={register}
              required
              errors={errors}
              validation={{ minLength: { value: 2, message: "Marca demasiado corta" } }}
            />
            <InputField
              label="Modelo"
              name="modelo"
              register={register}
              required
              errors={errors}
              validation={{ minLength: { value: 1, message: "Modelo requerido" } }}
            />
          </div>
          <div style={row}>
            <InputField
              label="Año de Fabricación"
              name="anio_fabricacion"
              type="number"
              register={register}
              required
              errors={errors}
              validation={{
                min: { value: 1900, message: "Año inválido" },
                max: { value: new Date().getFullYear(), message: "Año inválido" },
              }}
            />
            <InputField
              label="Placa"
              name="placa"
              register={register}
              required
              errors={errors}
              validation={{
                pattern: {
                  value: /^[A-Z0-9\-]+$/,
                  message: "Formato de placa inválido",
                },
              }}
            />
          </div>
          <div style={row}>
            <InputField
              label="Color"
              name="color"
              register={register}
              required
              errors={errors}
            />
            <InputField
              label="Tipo de Vehículo"
              name="tipo_vehiculo"
              register={register}
              required
              errors={errors}
            />
          </div>
          <InputField
            label="Kilometraje"
            name="kilometraje"
            type="number"
            register={register}
            required
            errors={errors}
            validation={{
              min: { value: 0, message: "El kilometraje no puede ser negativo" },
            }}
          />
          <InputField
            label="Descripción"
            name="descripcion"
            register={register}
            required
            errors={errors}
            validation={{
              minLength: { value: 5, message: "Descripción demasiado corta" },
            }}
          />

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", register, required = false, errors, validation }) => (
  <div style={inputContainer}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      placeholder={label}
      {...register(name, required ? { required: `${label} es obligatorio`, ...validation } : validation)}
      style={inputStyle}
    />
    {errors?.[name] && <p style={errorText}>{errors[name].message}</p>}
  </div>
);

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

const title = { marginBottom: "2rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };

const row = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
};

const inputContainer = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: "150px",
};

const labelStyle = { marginBottom: "0.5rem", fontWeight: "600", color: "#525b6d" };
const inputStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#1E1E2F",
  fontSize: "1.1rem",
  transition: "0.2s",
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
  transition: "0.2s",
};
buttonStyle[':hover'] = { background: "#434b5a" };

const errorText = { color: "#E04A4A", fontSize: "0.9rem", marginTop: "0.3rem" };

const mediaQuery = "@media (max-width: 600px)";
row[mediaQuery] = { flexDirection: "column" };

export default VehiculoCreate;
