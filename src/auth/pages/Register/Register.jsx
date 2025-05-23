import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Register = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    nit: "",
    edad: "",
    sexo: "",
    usuariocontra: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (
      !userData.nombre ||
      !userData.apellido ||
      !userData.correo ||
      !userData.telefono ||
      !userData.nit ||
      !userData.edad ||
      !userData.sexo ||
      !userData.usuariocontra
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      await authService.register(userData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Gestión de Aerolínea
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="nombre" className="sr-only">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={userData.nombre}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label htmlFor="apellido" className="sr-only">
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                required
                value={userData.apellido}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Apellido"
              />
            </div>
            <div>
              <label htmlFor="correo" className="sr-only">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                value={userData.correo}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="sr-only">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="text"
                required
                value={userData.telefono}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Teléfono"
              />
            </div>
            <div>
              <label htmlFor="nit" className="sr-only">
                NIT
              </label>
              <input
                id="nit"
                name="nit"
                type="text"
                required
                value={userData.nit}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="NIT"
              />
            </div>
            <div>
              <label htmlFor="edad" className="sr-only">
                Edad
              </label>
              <input
                id="edad"
                name="edad"
                type="number"
                required
                value={userData.edad}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Edad"
              />
            </div>
            <div>
              <label htmlFor="sexo" className="sr-only">
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                required
                value={userData.sexo}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="">Selecciona tu sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div>
              <label htmlFor="usuariocontra" className="sr-only">
                Contraseña
              </label>
              <input
                id="usuariocontra"
                name="usuariocontra"
                type="password"
                required
                value={userData.usuariocontra}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
