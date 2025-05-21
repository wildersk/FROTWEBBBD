// Contratos.jsx
import React, { useEffect, useState } from 'react';

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [form, setForm] = useState({ aerolineaId: '', aeropuertoId: '', contratoId: '', fechaInicio: '', fechaFin: '' });
  const [editId, setEditId] = useState(null);

  const fetchContratos = async () => {
    const res = await fetch('http://localhost:3000/contratos');
    const data = await res.json();
    setContratos(data);
  };

  useEffect(() => { fetchContratos(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId ? `http://localhost:3000/contratos/${editId}` : 'http://localhost:3000/contratos';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ aerolineaId: '', aeropuertoId: '', contratoId: '', fechaInicio: '', fechaFin: '' });
      setEditId(null);
      fetchContratos();
    }
  };

  const handleEdit = c => {
    setForm({
      aerolineaId: c.AER_AEROLINEA_ID,
      aeropuertoId: c.AER_AEROPUERTO_ID,
      contratoId: c.CON_CONTRATO_ID,
      fechaInicio: c.AEC_FECHA_INICIO?.split('T')[0],
      fechaFin: c.AEC_FECHA_FIN?.split('T')[0],
    });
    setEditId(c.AEC_AEROLINEA_CONTRATO_ID);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este contrato?')) return;
    const res = await fetch(`http://localhost:3000/contratos/${id}`, { method: 'DELETE' });
    if (res.ok) fetchContratos();
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Contratos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input name="aerolineaId" value={form.aerolineaId} onChange={handleChange} placeholder="ID Aerolínea" required />
        <input name="aeropuertoId" value={form.aeropuertoId} onChange={handleChange} placeholder="ID Aeropuerto" required />
        <input name="contratoId" value={form.contratoId} onChange={handleChange} placeholder="ID Contrato" required />
        <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />
        <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Aerolínea</th><th>Aeropuerto</th><th>Contrato</th><th>Inicio</th><th>Fin</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {contratos.map(c => (
            <tr key={c.AEC_AEROLINEA_CONTRATO_ID}>
              <td>{c.AER_AEROLINEA_ID}</td>
              <td>{c.AER_AEROPUERTO_ID}</td>
              <td>{c.CON_CONTRATO_ID}</td>
              <td>{c.AEC_FECHA_INICIO?.split('T')[0]}</td>
              <td>{c.AEC_FECHA_FIN?.split('T')[0]}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.AEC_AEROLINEA_CONTRATO_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contratos;
