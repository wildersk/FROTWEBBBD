// src/components/CompraTicket.jsx
import { useState } from 'react';

export default function CompraTicket() {
  const [form, setForm] = useState({
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: 1,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la compra (llamar API, validar, etc)
    alert(`Comprando ticket de ${form.origen} a ${form.destino} para ${form.pasajeros} pasajero(s) en fecha ${form.fecha}`);
  };

  return (
    <div>
      <h2>Comprar Ticket de Avión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Origen:
          <input type="text" name="origen" value={form.origen} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" name="destino" value={form.destino} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Pasajeros:
          <input type="number" name="pasajeros" min="1" value={form.pasajeros} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Comprar</button>
      </form>
    </div>
  );
}
