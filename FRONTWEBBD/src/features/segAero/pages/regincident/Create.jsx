import React, { useEffect, useState } from "react";

const apiBase = "http://localhost:3000/incidentes_tipos_incidente"; // Cambia esto por tu endpoint real
const apiInsert = "http://localhost:3000/insertar_incidente_seguridad";

const CreateRegin = () => {
  const [tiposIncidente, setTiposIncidente] = useState([]);

  const [form, setForm] = useState({
    tipoIncidente: "",
    aeropuerto: "",
    nombre: "",
    descripcion: "",
    direccion: "",
    fecha: new Date().toISOString().slice(0, 16), // formato YYYY-MM-DDTHH:mm
    estado_id: "1", // 1: Resuelto, 2: En proceso
  });

  // Opciones de aeropuerto (puedes agregar más si lo necesitas)
  const aeropuertos = [
    { id: "GUA", nombre: "Guatemala" },
    // { id: "XXX", nombre: "Otro Aeropuerto" }, // Agrega más si es necesario
  ];

  useEffect(() => {
    fetch(apiBase)
      .then((res) => res.json())
      .then((data) => {
        // data es un array de arrays: [id, nombre, descripcion]
        if (data && Array.isArray(data)) {
          const tipos = data.map(([id, nombre, descripcion]) => ({
            id,
            nombre,
            descripcion,
          }));
          setTiposIncidente(tipos);
        } else {
          setTiposIncidente([]);
          console.error(
            "La respuesta de la API no es un array de arrays:",
            data
          );
        }
      })
      .catch((err) => {
        console.error("Error al obtener tipos de incidente:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario a tu API
    console.log(form);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Registrar Incidente</h2>

        <label style={styles.label}>Seleccionar tipo incidente</label>
        <select
          name="tipoIncidente"
          value={form.tipoIncidente}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Seleccione...</option>
          {tiposIncidente.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>

        <label style={styles.label}>Seleccionar Aeropuerto</label>
        <select
          name="aeropuerto"
          value={form.aeropuerto}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Seleccione...</option>
          <option value="GUA">Aeropuerto Aurora</option>
          {aeropuertos
            .filter((a) => a.id !== "GUA")
            .map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
        </select>

        <label style={styles.label}>Ingresar Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Ingresar Descripcion</label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Fecha y Hora</label>
        <input
          type="datetime-local"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Registrar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
    color: "#2d3a4b",
  },
  label: {
    fontWeight: "bold",
    color: "#2d3a4b",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #cfd8dc",
    fontSize: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default CreateRegin;
