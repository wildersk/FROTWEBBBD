import React, { useEffect, useState } from 'react';

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '' });

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
      setFormData({ nombre: '', correo: '', telefono: '' });
      const lista = await fetch('http://localhost:3000/aerolineas').then(r => r.json());
      setAerolineas(lista);
    } else {
      alert('Error al registrar aerolínea');
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Registrar Aerolínea</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <input type="text" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
        <input type="email" placeholder="Correo" value={formData.correo} onChange={e => setFormData({ ...formData, correo: e.target.value })} required />
        <input type="text" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} required />
        <button type="submit">Registrar</button>
      </form>

      <h2 style={{ fontSize: '1.5rem' }}>Lista de Aerolíneas</h2>
      {aerolineas.length === 0 ? (
        <p>No hay aerolíneas registradas.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {aerolineas.map((a) => (
              <tr key={a.AER_AEROLINEA_ID}>
                <td>{a.AER_NOMBRE_AEROLINEA}</td>
                <td>{a.AER_CORREO}</td>
                <td>{a.AER_TELEFONO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Aerolineas;