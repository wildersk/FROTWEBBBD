// Usuarios.jsx
import React, { useEffect, useState } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsuarios = async () => {
    const res = await fetch('http://localhost:3000/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId ? `http://localhost:3000/usuarios/${editId}` : 'http://localhost:3000/usuarios';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nombre: '', correo: '', contrasena: '' });
      setEditId(null);
      fetchUsuarios();
    }
  };

  const handleEdit = usuario => {
    setForm({ nombre: usuario.USU_NOMBRE_USUARIO, correo: usuario.USU_CORREO, contrasena: '' });
    setEditId(usuario.USU_USUARIO_ID);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    const res = await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
    if (res.ok) fetchUsuarios();
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Usuarios</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo" required />
        <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" required={!editId} />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.USU_USUARIO_ID}>
              <td>{u.USU_NOMBRE_USUARIO}</td>
              <td>{u.USU_CORREO}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.USU_USUARIO_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
