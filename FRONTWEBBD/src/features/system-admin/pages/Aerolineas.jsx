import React, { useEffect, useState } from 'react';

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', codigo: '', modelosDisponibles: '' });

  useEffect(() => {
    fetch('http://localhost:3000/aerolineas')
      .then(res => res.json())
      .then(data => setAerolineas(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/aerolineas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Aerolínea registrada');
      setFormData({ nombre: '', codigo: '', modelosDisponibles: '' });
      const lista = await fetch('http://localhost:3000/aerolineas').then(r => r.json());
      setAerolineas(lista);
    } else {
      alert('Error al registrar aerolínea');
    }
  };

  // Render the list of aerolineas
  return (
    <div>
      <h2>Registrar Aerolínea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={e => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Código"
          value={formData.codigo}
          onChange={e => setFormData({ ...formData, codigo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Modelos Disponibles"
          value={formData.modelosDisponibles}
          onChange={e => setFormData({ ...formData, modelosDisponibles: e.target.value })}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <h2>Lista de Aerolíneas</h2>
      <ul>
        {aerolineas.map((aerolinea, idx) => (
          <li key={idx}>
            {aerolinea.nombre} ({aerolinea.codigo}) - Modelos: {aerolinea.modelosDisponibles}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aerolineas;