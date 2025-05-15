import { useState } from 'react';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]); // Eliminamos la anotación de tipo
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: 'ADMIN',
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuarios.some((usuario) => usuario.correo === formData.correo)) {
      alert('El correo ya está registrado.');
      return;
    }
    setUsuarios([...usuarios, formData]);
    setFormData({ nombre: '', correo: '', rol: 'ADMIN', activo: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del Usuario"
          className="border p-2 w-full"
          required
        />
        <input
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          type="email"
          className="border p-2 w-full"
          required
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="ADMIN">Administrador</option>
          <option value="OPERADOR">Operador</option>
          <option value="SUPERVISOR">Supervisor</option>
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
          <span>Activo</span>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Registrar Usuario
        </button>
      </form>

      <h2 className="text-lg font-semibold">Usuarios Registrados</h2>
      <ul className="mt-2 list-disc pl-5">
        {usuarios.map((usuario, index) => (
          <li key={index}>
            {usuario.nombre} ({usuario.correo}) - Rol: {usuario.rol} -{' '}
            {usuario.activo ? 'Activo' : 'Inactivo'}
          </li>
        ))}
      </ul>
    </div>
  );
}
