// Pistas.jsx
import React, { useEffect, useState } from 'react';

const Pistas = () => {
  const [pistas, setPistas] = useState([]);
  const [form, setForm] = useState({ nombre: '', longitud: '', ancho: '', aeropuertoId: '' });
  const [editId, setEditId] = useState(null);

  const fetchPistas = async () => {
    const res = await fetch('http://localhost:3000/pistas');
    const data = await res.json();
    setPistas(data);
  };

  useEffect(() => { fetchPistas(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId ? `http://localhost:3000/pistas/${editId}` : 'http://localhost:3000/pistas';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nombre: '', longitud: '', ancho: '', aeropuertoId: '' });
      setEditId(null);
      fetchPistas();
    }
  };

  const handleEdit = pista => {
    setForm({
      nombre: pista.PIS_NOMBRE_PISTA,
      longitud: pista.PIS_LONGITUD,
      ancho: pista.PIS_ANCHO,
      aeropuertoId: pista.AER_AEROPUERTO_ID
    });
    setEditId(pista.PIS_PISTA_ID);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar esta pista?')) return;
    const res = await fetch(`http://localhost:3000/pistas/${id}`, { method: 'DELETE' });
    if (res.ok) fetchPistas();
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Pistas</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="longitud" type="number" value={form.longitud} onChange={handleChange} placeholder="Longitud (m)" required />
        <input name="ancho" type="number" value={form.ancho} onChange={handleChange} placeholder="Ancho (m)" required />
        <input name="aeropuertoId" value={form.aeropuertoId} onChange={handleChange} placeholder="ID Aeropuerto" required />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Nombre</th><th>Longitud</th><th>Ancho</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {pistas.map(p => (
            <tr key={p.PIS_PISTA_ID}>
              <td>{p.PIS_NOMBRE_PISTA}</td>
              <td>{p.PIS_LONGITUD}</td>
              <td>{p.PIS_ANCHO}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.PIS_PISTA_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pistas;