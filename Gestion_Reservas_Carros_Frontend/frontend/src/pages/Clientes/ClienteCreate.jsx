import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import storeAuth from "../../context/storeAuth";
import { FaSave } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ClienteCreate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = storeAuth();
  const navigate = useNavigate();

  const createCliente = async (data) => {
    try {
      const response = await fetch("https://gesvehiculosbackend-production.up.railway.app/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula || "",
          fecha_nacimiento: data.fecha_nacimiento,
          ciudad: data.ciudad || "",
          direccion: data.direccion || "",
          telefono: data.telefono || "",
          email: data.email || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.msg || "Error al crear el cliente");
        return;
      }

      toast.success("Cliente creado con éxito");
      setTimeout(() => navigate("/dashboard/clientes"), 1500);

    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Registrar Cliente</h2>
        <form onSubmit={handleSubmit(createCliente)} style={formStyle}>
          <div style={row}>
            <InputField
              label="Nombre"
              name="nombre"
              register={register}
              required
              errors={errors}
              validation={{
                required: "Nombre es obligatorio",
                minLength: { value: 2, message: "Nombre demasiado corto" },
              }}
            />
            <InputField
              label="Apellido"
              name="apellido"
              register={register}
              required
              errors={errors}
              validation={{
                required: "Apellido es obligatorio",
                minLength: { value: 2, message: "Apellido demasiado corto" },
              }}
            />
          </div>
          <InputField
            label="Cédula"
            name="cedula"
            register={register}
            validation={{
              pattern: { value: /^\d{10}$/, message: "Cédula debe tener 10 dígitos" },
            }}
            errors={errors}
          />
          <InputField
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            type="date"
            register={register}
            required
            errors={errors}
          />
          <div style={row}>
            <InputField label="Ciudad" name="ciudad" register={register} errors={errors} />
            <InputField label="Dirección" name="direccion" register={register} errors={errors} />
          </div>
          <div style={row}>
            <InputField
              label="Teléfono"
              name="telefono"
              register={register}
              errors={errors}
              validation={{
                pattern: { value: /^[0-9]{7,15}$/, message: "Teléfono inválido" },
              }}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
              validation={{
                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Email inválido" },
              }}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente reutilizable para input
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

// Contenedor del input, hace que ocupe 100% en móviles
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

// --- Media Queries ---
const mediaQuery = "@media (max-width: 600px)";
row[mediaQuery] = { flexDirection: "column" };

export default ClienteCreate;
