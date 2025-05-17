import React, { useEffect, useState } from "react";

const apiBase = "http://localhost:3000/incidentes_tipos_incidente";
const apiInsert = "http://localhost:3000/insertar_incidente_seguridad";

const CreateRegin = () => {
  const [tiposIncidente, setTiposIncidente] = useState([]);
  const [form, setForm] = useState({
    tipoIncidente: "",
    nombre_incidente: "",
    aeropuerto: "",
    nombre: "",
    descripcion: "",
    direccion: "",
    fecha: new Date().toISOString().slice(0, 16),
    estado_id: "1",
  });

  const aeropuertos = [{ id: 21513, nombre: "Guatemala" }];

  useEffect(() => {
    fetch(apiBase)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const tipos = data.map(([id, nombre]) => ({
            id: String(id),
            nombre,
          }));
          setTiposIncidente(tipos);
        } else {
          setTiposIncidente([]);
          console.error("Respuesta inesperada de la API:", data);
        }
      })
      .catch((err) =>
        console.error("Error al obtener tipos de incidente:", err)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newState = { ...prev, [name]: value };

      // Actualizar nombre_incidente automáticamente si cambia tipoIncidente
      if (name === "tipoIncidente") {
        const tipoSeleccionado = tiposIncidente.find((t) => t.id === value);
        newState.nombre_incidente = tipoSeleccionado
          ? tipoSeleccionado.nombre
          : "Incidente desconocido";
      }

      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatFecha = (fecha) => {
      return fecha.split("T")[0]; // Retorna solo la parte de la fecha en formato YYYY-MM-DD
    };

    const body = {
      nombre_incidente: form.nombre_incidente,
      tipo_incidente_id: Number(form.tipoIncidente),
      aeropuerto_id: form.aeropuerto ? Number(form.aeropuerto) : 21513,
      nombre_persona: form.nombre,
      descripcion: form.descripcion,
      fecha_incidente: formatFecha(form.fecha), // Formatear la fecha
      estado_id: Number(form.estado_id),
    };

    console.log("Datos enviados:", body); // Depuración antes de enviar

    try {
      const res = await fetch(apiInsert, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let errorMsg = "Error al registrar incidente";
        try {
          const errorData = await res.json();
          if (errorData?.message) errorMsg += ": " + errorData.message;
        } catch {}
        throw new Error(errorMsg);
      }

      alert("Incidente registrado correctamente");
    } catch (err) {
      console.error("Error en la solicitud:", err);
    }
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
          {aeropuertos.map((a) => (
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

        <label style={styles.label}>Ingresar Descripción</label>
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

        <label style={styles.label}>Estado</label>
        <select
          name="estado_id"
          value={form.estado_id}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="1">Resuelto</option>
          <option value="2">En proceso</option>
        </select>

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
  },
};

export default CreateRegin;
