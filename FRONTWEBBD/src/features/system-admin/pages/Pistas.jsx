import React, { useEffect, useState } from 'react';

const Pistas = () => {
  const [pistas, setPistas] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    longitud: '',
    ancho: '',
    aeropuertoId: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchPistas = async () => {
    const res = await fetch('http://localhost:3000/pistas');
    const data = await res.json();
    setPistas(data);
  };

  useEffect(() => {
    fetchPistas();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:3000/pistas/${editId}`
      : 'http://localhost:3000/pistas';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ nombre: '', longitud: '', ancho: '', aeropuertoId: '' });
      setEditId(null);
      fetchPistas();
    }
  };

  const handleEdit = pista => {
    setForm({
      nombre: pista[1],
      longitud: pista[2],
      ancho: pista[3],
      aeropuertoId: pista[4] || ''
    });
    setEditId(pista[0]);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar esta pista?')) return;
    const res = await fetch(`http://localhost:3000/pistas/${id}`, { method: 'DELETE' });
    if (res.ok) fetchPistas();
  };

  return (
    <div>
      <h2>Pistas</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="longitud" type="number" value={form.longitud} onChange={handleChange} placeholder="Longitud (m)" />
        <input name="ancho" type="number" value={form.ancho} onChange={handleChange} placeholder="Ancho (m)" />
        <input name="aeropuertoId" value={form.aeropuertoId} onChange={handleChange} placeholder="ID Aeropuerto" />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Longitud</th><th>Ancho</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pistas.map(p => (
            <tr key={p[0]}>
              <td>{p[1]}</td>
              <td>{p[2]}</td>
              <td>{p[3]}</td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p[0])}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pistas;
