// Aeropuertos.jsx
import React, { useEffect, useState } from 'react';

const Aeropuertos = () => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [form, setForm] = useState({ codigo: '', nombre: '', ciudadId: '' });
  const [editId, setEditId] = useState(null);

  const fetchAeropuertos = async () => {
    const res = await fetch('http://localhost:3000/aeropuertos');
    const data = await res.json();
    setAeropuertos(data);
  };

  useEffect(() => { fetchAeropuertos(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId ? `http://localhost:3000/aeropuertos/${editId}` : 'http://localhost:3000/aeropuertos';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ codigo: '', nombre: '', ciudadId: '' });
      setEditId(null);
      fetchAeropuertos();
    }
  };

  const handleEdit = a => {
    setForm({ codigo: a.AER_CODIGO_IATA, nombre: a.AER_NOMBRE_AEROPUERTO, ciudadId: a.CIU_CIUDAD_ID });
    setEditId(a.AER_AEROPUERTO_ID);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este aeropuerto?')) return;
    const res = await fetch(`http://localhost:3000/aeropuertos/${id}`, { method: 'DELETE' });
    if (res.ok) fetchAeropuertos();
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Aeropuertos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código IATA" required />
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="ciudadId" value={form.ciudadId} onChange={handleChange} placeholder="ID Ciudad" required />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Código</th><th>Nombre</th><th>Ciudad ID</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {aeropuertos.map(a => (
            <tr key={a.AER_AEROPUERTO_ID}>
              <td>{a.AER_CODIGO_IATA}</td>
              <td>{a.AER_NOMBRE_AEROPUERTO}</td>
              <td>{a.CIU_CIUDAD_ID}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Editar</button>
                <button onClick={() => handleDelete(a.AER_AEROPUERTO_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Aeropuertos;
