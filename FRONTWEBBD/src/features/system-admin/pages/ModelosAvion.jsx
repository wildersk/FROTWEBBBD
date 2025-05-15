import { useState } from 'react';

export default function ModelosAvion() {
  const [modelos, setModelos] = useState([]);
  const [formData, setFormData] = useState({
    nombreModelo: '',
    capacidad: '',
    clasePrimera: '',
    claseEjecutiva: '',
    claseTurista: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacidad' || name === 'clasePrimera' || name === 'claseEjecutiva' || name === 'claseTurista' ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModelos([...modelos, formData]);
    setFormData({
      nombreModelo: '',
      capacidad: '',
      clasePrimera: '',
      claseEjecutiva: '',
      claseTurista: '',
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Modelos de Avión</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="nombreModelo"
          value={formData.nombreModelo}
          onChange={handleChange}
          placeholder="Nombre del Modelo"
          className="border p-2 w-full"
          required
        />
        <input
          name="capacidad"
          value={formData.capacidad}
          onChange={handleChange}
          placeholder="Capacidad Total"
          type="number"
          className="border p-2 w-full"
          required
        />
        <input
          name="clasePrimera"
          value={formData.clasePrimera}
          onChange={handleChange}
          placeholder="Primera Clase"
          type="number"
          className="border p-2 w-full"
        />
        <input
          name="claseEjecutiva"
          value={formData.claseEjecutiva}
          onChange={handleChange}
          placeholder="Ejecutiva"
          type="number"
          className="border p-2 w-full"
        />
        <input
          name="claseTurista"
          value={formData.claseTurista}
          onChange={handleChange}
          placeholder="Turista"
          type="number"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Registrar
        </button>
      </form>

      <h2 className="text-lg font-semibold">Modelos Registrados</h2>
      <ul className="mt-2 list-disc pl-5">
        {modelos.map((modelo, index) => (
          <li key={index}>
            {modelo.nombreModelo} - Capacidad: {modelo.capacidad} (Primera: {modelo.clasePrimera}, Ejecutiva: {modelo.claseEjecutiva}, Turista: {modelo.claseTurista})
          </li>
        ))}
      </ul>
    </div>
  );
}
