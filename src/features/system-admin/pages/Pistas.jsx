import { useState } from 'react';

export default function Pistas() {
  const [pistas, setPistas] = useState([]);
  const [formData, setFormData] = useState({
    identificador: '',
    disponible: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'disponible' ? value === 'true' : value === 'false' ? false : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPistas([...pistas, formData]);
    setFormData({ identificador: '', disponible: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Pistas</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="identificador"
          value={formData.identificador}
          onChange={handleChange}
          placeholder="ID de la Pista"
          className="border p-2 w-full"
          required
        />
        <select
          name="disponible"
          value={String(formData.disponible)}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="true">Disponible</option>
          <option value="false">No disponible</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Registrar Pista
        </button>
      </form>

      <h2 className="text-lg font-semibold">Pistas Registradas</h2>
      <ul className="mt-2 list-disc pl-5">
        {pistas.map((p, index) => (
          <li key={index}>
            {p.identificador} – {p.disponible ? 'Disponible' : 'No disponible'}
          </li>
        ))}
      </ul>
    </div>
  );
}
