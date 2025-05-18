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

  useEffect(() => {
    fetchAeropuertos();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:3000/aeropuertos/${editId}`
      : 'http://localhost:3000/aeropuertos';

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

  const handleEdit = aer => {
    setForm({ codigo: aer[1], nombre: aer[2], ciudadId: aer[3] });
    setEditId(aer[0]);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este aeropuerto?')) return;
    const res = await fetch(`http://localhost:3000/aeropuertos/${id}`, { method: 'DELETE' });
    if (res.ok) fetchAeropuertos();
  };

  return (
    <div>
      <h2>Aeropuertos</h2>
      <form onSubmit={handleSubmit}>
        <input name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código IATA" />
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="ciudadId" value={form.ciudadId} onChange={handleChange} placeholder="ID Ciudad" />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Código</th><th>Nombre</th><th>Ciudad ID</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.map(aer => (
            <tr key={aer[0]}>
              <td>{aer[1]}</td>
              <td>{aer[2]}</td>
              <td>{aer[3]}</td>
              <td>
                <button onClick={() => handleEdit(aer)}>✏️</button>
                <button onClick={() => handleDelete(aer[0])}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Aeropuertos;
