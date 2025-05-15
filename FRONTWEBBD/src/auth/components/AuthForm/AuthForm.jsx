/*export default function AuthForm({ credentials, onChange, onSubmit, type }) {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={onChange}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              type === "login" ? "current-password" : "new-password"
            }
            required
            value={credentials.password}
            onChange={onChange}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Contraseña"
          />
        </div>
      </div>

      {type === "login" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {type === "login" ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </div>
    </form>
  );
}*/

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

    if (username === "dgac" && password === "123") {
      const userData = {
        name: "DGAC",
        role: "dgac",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dgac/dashboard");
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
