import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Función de login simulada
  // Removed duplicate login function

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Verificar si hay usuario al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    // Simulamos validación
    if (username === "operador" && password === "123") {
      const userData = {
        name: "Operador de Vuelo",
        role: "flight_operator",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/flight-operator/dashboard");
      return true;
    }

    if (username === "admin" && password === "123") {
      const userData = {
        name: "Administrador",
        role: "system_admin",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/system-admin/dashboard");
      return true;
    }

    if (username === "DGAC" && password === "123") {
      const userData = {
        name: "DGAC",
        role: "DGAC",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/DGAC/dashboard");
      return true;
    }

    if (username === "segAero" && password === "123") {
      const userData = {
        name: "SEGAERO",
        role: "segAero",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/segaero/dashboard");
      return true;
    }
    if (username === "controlvuelo" && password === "123") {
      const userData = {
        name: "Control de Vuelo",
        role: "controlVuelo",
      };
      console.log("Login como:", userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/controlvuelo/dashboard");
      return true;
    }
    if (username === "check" && password === "123") {
      const userData = {
        name: "check",
        role: "check",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/check /dashboard");
      return true;
    }
    return false; // Login fallido
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
