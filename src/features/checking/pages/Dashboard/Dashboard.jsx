import React, { useState } from "react";

const menuStyle = {
  width: "250px",
  background: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  fontFamily: "Arial, sans-serif",
};

const menuItemStyle = {
  padding: "10px 0",
  cursor: "pointer",
  fontWeight: "bold",
  borderBottom: "1px solid #eee",
};

const submenuStyle = {
  paddingLeft: "16px",
  marginTop: "8px",
};

const labelStyle = {
  display: "block",
  margin: "8px 0 4px",
  fontWeight: "normal",
};

const inputStyle = {
  width: "90%",
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

export default function Dashboard() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [form, setForm] = useState({
    boleto: "",
    asiento: "",
    fechaHora: "",
    estado: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={menuStyle}>
      <div
        style={menuItemStyle}
        onClick={() => setShowSubmenu((prev) => !prev)}
      >
        Registrar checkin
      </div>
      {showSubmenu && (
        <div style={submenuStyle}>
          <label style={labelStyle}>Número de boleto</label>
          <input
            style={inputStyle}
            type="text"
            name="boleto"
            value={form.boleto}
            onChange={handleChange}
            placeholder="Ej: 12345"
          />

          <label style={labelStyle}>Número de asiento</label>
          <input
            style={inputStyle}
            type="text"
            name="asiento"
            value={form.asiento}
            onChange={handleChange}
            placeholder="Ej: 12A"
          />

          <label style={labelStyle}>Ingresar fecha y hora</label>
          <input
            style={inputStyle}
            type="datetime-local"
            name="fechaHora"
            value={form.fechaHora}
            onChange={handleChange}
          />

          <label style={labelStyle}>Estado del checkin</label>
          <select
            style={inputStyle}
            name="estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      )}
    </div>
  );
}
