import React, { useEffect, useState } from 'react';

const ModelosAvion = () => {
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({ nombreModelo: '', capacidad: '' });
  const [editId, setEditId] = useState(null);

  const fetchModelos = async () => {
    const res = await fetch('http://localhost:3000/modelos');
    const data = await res.json();
    setModelos(data);
  };

  useEffect(() => {
    fetchModelos();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:3000/modelos/${editId}`
      : 'http://localhost:3000/modelos';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ nombreModelo: '', capacidad: '' });
      setEditId(null);
      fetchModelos();
    }
  };

  const handleEdit = modelo => {
    setForm({ nombreModelo: modelo[1], capacidad: modelo[2] });
    setEditId(modelo[0]);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este modelo de avión?')) return;
    const res = await fetch(`http://localhost:3000/modelos/${id}`, { method: 'DELETE' });
    if (res.ok) fetchModelos();
  };

  return (
    <div>
      <h2>Modelos de Avión</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreModelo" value={form.nombreModelo} onChange={handleChange} placeholder="Nombre del modelo" />
        <input name="capacidad" type="number" value={form.capacidad} onChange={handleChange} placeholder="Capacidad total" />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Capacidad</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos.map(mod => (
            <tr key={mod[0]}>
              <td>{mod[1]}</td>
              <td>{mod[2]}</td>
              <td>
                <button onClick={() => handleEdit(mod)}>✏️</button>
                <button onClick={() => handleDelete(mod[0])}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelosAvion;
