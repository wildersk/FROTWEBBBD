// ModelosAvion.jsx
import React, { useEffect, useState } from 'react';

const ModelosAvion = () => {
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({ nombreModelo: '', capacidad: '' });
  const [editId, setEditId] = useState(null);

  const fetchModelos = async () => {
    const res = await fetch('http://localhost:3000/modelos-avion');
    const data = await res.json();
    setModelos(data);
  };

  useEffect(() => { fetchModelos(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId ? `http://localhost:3000/modelos-avion/${editId}` : 'http://localhost:3000/modelos-avion';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nombreModelo: '', capacidad: '' });
      setEditId(null);
      fetchModelos();
    }
  };

  const handleEdit = modelo => {
    setForm({ nombreModelo: modelo.MOA_NOMBRE_MODELO, capacidad: modelo.MOA_CAPACIDAD_TOTAL });
    setEditId(modelo.MOA_MODELO_AVION_ID);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este modelo de avión?')) return;
    const res = await fetch(`http://localhost:3000/modelos-avion/${id}`, { method: 'DELETE' });
    if (res.ok) fetchModelos();
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Modelos de Avión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input name="nombreModelo" value={form.nombreModelo} onChange={handleChange} placeholder="Nombre del modelo" required />
        <input name="capacidad" type="number" value={form.capacidad} onChange={handleChange} placeholder="Capacidad total" required />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Nombre</th><th>Capacidad</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {modelos.map(mod => (
            <tr key={mod.MOA_MODELO_AVION_ID}>
              <td>{mod.MOA_NOMBRE_MODELO}</td>
              <td>{mod.MOA_CAPACIDAD_TOTAL}</td>
              <td>
                <button onClick={() => handleEdit(mod)}>Editar</button>
                <button onClick={() => handleDelete(mod.MOA_MODELO_AVION_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelosAvion;
