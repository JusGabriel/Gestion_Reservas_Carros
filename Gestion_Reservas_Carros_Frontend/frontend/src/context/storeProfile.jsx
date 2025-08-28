import { create } from "zustand";
import axios from "axios";

// Obtener el token desde localStorage (guardado por storeAuth)
const getStoredAuth = () => {
  const stored = JSON.parse(localStorage.getItem("auth-token"));
  return stored?.state || {};
};

// Configurar headers con token
const getAuthHeaders = () => {
  const { token } = getStoredAuth();
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const storeProfile = create((set) => ({
  user: null,

  // Limpiar el usuario en memoria
  clearUser: () => set({ user: null }),

  // Obtener el perfil
  profile: async () => {
    try {
      const url = `https://gestionmatriculas-production.up.railway.app/api/usuarios/perfil`;
      const respuesta = await axios.get(url, getAuthHeaders());
      set({ user: respuesta.data });
      return { success: true, data: respuesta.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.msg || "No se pudo obtener el perfil del usuario",
      };
    }
  },

  // Actualizar datos del perfil
  updateProfile: async (data, id) => {
    try {
      const url = `https://gestionmatriculas-production.up.railway.app/api/usuarios/${id}`;
      const respuesta = await axios.put(url, data, getAuthHeaders());
      set({ user: respuesta.data });
      return { success: true, data: respuesta.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.msg || "Error al actualizar perfil",
      };
    }
  },

  // Actualizar contraseña
  updatePasswordProfile: async (data, id) => {
    try {
      const url = `https://gestionmatriculas-production.up.railway.app/api/usuarios/actualizarpassword/${id}`;
      const respuesta = await axios.put(url, data, getAuthHeaders());
      return {
        success: true,
        msg: respuesta?.data?.msg || "Contraseña actualizada",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.msg || "Error al actualizar contraseña",
      };
    }
  },
}));

export default storeProfile;
