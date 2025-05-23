import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default {
  async login(credentials) {
  console.log("Enviando credenciales:", credentials);
  const response = await axios.post(`${API_URL}/verificar-credenciales`, credentials);
  return response.data;
},
    // Aquí puedes implementar la lógica de cierre de sesión si es necesario

  async logout() {
    // Aquí puedes implementar la lógica de cierre de sesión si es necesario
    localStorage.removeItem("user");
  },

  async register(userData) {
    // Usa el endpoint real de tu backend
    const response = await axios.post(`${API_URL}/registrar-usuario`, userData);
    return response.data;
  },
};

