import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función de login mejorada
  const login = (username, password) => {
    // Simulación de autenticación
    let authenticatedUser = null;

    if (username === "operador" && password === "123") {
      authenticatedUser = {
        username,
        role: "flight_operator",
        name: "Operador de Vuelo",
      };
    } else if (username === "admin" && password === "123") {
      authenticatedUser = {
        username,
        role: "system_admin",
        name: "Administrador",
      };
    } else if (username === "DGAC" && password === "123") {
      authenticatedUser = {
        username,
        role: "DGAC",
        name: "DGAC",
      };
    } else if (username === "segAero" && password === "123") {
      authenticatedUser = {
        username,
        role: "segAero",
        name: "SegAero",
      };
    } else if (username === "usuReports" && password === "123") {
      authenticatedUser = {
        username,
        role: "usuReports",
        name: "usureports",
      };
    } else if (username === "controlvuelo" && password === "123") {
      authenticatedUser = {
        username,
        role: "controlVuelo",
        name: "Control de Vuelo",
      };
    } else if (username === "check" && password === "123") {
      authenticatedUser = {
        username,
        role: "check",
        name: "Check",
      };
    } else if (username === "pasajero" && password === "123") {
      authenticatedUser = {
        username,
        role: "pasajero",
        name: "Pasajero",
      };
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));

      // Redirigir según el rol
      if (authenticatedUser.role === "flight_operator") {
        navigate("/flight-operator/dashboard");
      } else if (authenticatedUser.role === "system_admin") {
        navigate("/system-admin/dashboard");
      } else if (authenticatedUser.role === "DGAC") {
        navigate("/DGAC/dashboard");
      } else if (authenticatedUser.role === "segAero") {
        navigate("/segAero/dashboard");
      } else if (authenticatedUser.role === "usuReports") {
        navigate("/usuReports/dashboard");
      } else if (authenticatedUser.role === "controlVuelo") {
        navigate("/controlvuelo/dashboard");
      } else if (authenticatedUser.role === "check") {
        navigate("/check/dashboard");
      } else if (authenticatedUser.role === "pasajero") {
        navigate("/appUsu/dashboard/dashboardappUsu");
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Verificar sesión al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
