import React, { useEffect, useState } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    email: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchUsuarios = async () => {
    const res = await fetch('http://localhost:3000/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3000/usuarios/${editId}`
      : 'http://localhost:3000/usuarios';

    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ nombre: '', email: '' });
      setEditId(null);
      fetchUsuarios();
    } else {
      alert('Error al guardar usuario');
    }
  };

  const handleEdit = usuario => {
    // Ajusta aquí los índices según tu estructura de datos
    setForm({
      nombre: usuario[1], 
      email: usuario[2]
    });
    setEditId(usuario[0]);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este usuario?')) return;

    const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) fetchUsuarios();
    else alert('Error al eliminar usuario');
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ nombre: '', email: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u[0]}>
              <td>{u[1]}</td>
              <td>{u[2]}</td>
              <td>
                <button onClick={() => handleEdit(u)}>✏️</button>
                <button onClick={() => handleDelete(u[0])}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
