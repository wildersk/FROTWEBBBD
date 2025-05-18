import React, { useEffect, useState } from 'react';

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [form, setForm] = useState({
    aerolineaId: '',
    aeropuertoId: '',
    contratoId: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchContratos = async () => {
    const res = await fetch('http://localhost:3000/contratos');
    const data = await res.json();
    setContratos(data);
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:3000/contratos/${editId}`
      : 'http://localhost:3000/contratos';
    const method = editId ? 'PUT' : 'POST';

    const body = {
      ...form,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setForm({
        aerolineaId: '',
        aeropuertoId: '',
        contratoId: '',
        fechaInicio: '',
        fechaFin: ''
      });
      setEditId(null);
      fetchContratos();
    }
  };

  const handleEdit = contrato => {
    setForm({
      aerolineaId: contrato[1],
      aeropuertoId: contrato[2],
      contratoId: contrato[3],
      fechaInicio: contrato[4].split('T')[0],
      fechaFin: contrato[5].split('T')[0]
    });
    setEditId(contrato[0]);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este contrato?')) return;
    const res = await fetch(`http://localhost:3000/contratos/${id}`, { method: 'DELETE' });
    if (res.ok) fetchContratos();
  };

  return (
    <div>
      <h2>Contratos</h2>
      <form onSubmit={handleSubmit}>
        <input name="aerolineaId" value={form.aerolineaId} onChange={handleChange} placeholder="ID Aerolínea" />
        <input name="aeropuertoId" value={form.aeropuertoId} onChange={handleChange} placeholder="ID Aeropuerto" />
        <input name="contratoId" value={form.contratoId} onChange={handleChange} placeholder="ID Contrato" />
        <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
        <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
        <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Aerolínea</th><th>Aeropuerto</th><th>Contrato</th><th>Inicio</th><th>Fin</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map(c => (
            <tr key={c[0]}>
              <td>{c[1]}</td>
              <td>{c[2]}</td>
              <td>{c[3]}</td>
              <td>{c[4]?.split('T')[0]}</td>
              <td>{c[5]?.split('T')[0]}</td>
              <td>
                <button onClick={() => handleEdit(c)}>✏️</button>
                <button onClick={() => handleDelete(c[0])}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contratos;
