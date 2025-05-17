import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateFlightPlan.module.css";

const CreateFlightPlan = () => {
  const [flightData, setFlightData] = useState([]);
  const [tipoNave, setTipoNave] = useState([]);
  const [tipoVuelo, setTipoVuelo] = useState([]);
  const [dga, setDga] = useState([]);
  const [form, setForm] = useState({
    flightNumber: "",
    destination: "",
    date: "",
    time: "",
    observation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/datos-vuelo");
        console.log("Respuesta del backend:", response.data);
        setFlightData(response.data.vuelos || []);
        setTipoNave(response.data.tipoNave || []);
        setTipoVuelo(response.data.tipoVuelo || []);
        setDga(response.data.dga || []);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", form);
  };

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Crear Plan de Vuelo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de vuelo:</label>
          <input
            type="text"
            name="flightNumber"
            value={form.flightNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destino:</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Observación:</label>
          <input
            type="text"
            name="observation"
            value={form.observation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Plan</button>
      </form>

      {/* Tabla de vuelos */}
      <h1 className={styles.h1}>Flight Data</h1>
      <table className={styles.table} border="1">
        <thead className={styles.thead}>
          <tr>
            <th>Aeropuerto ID</th>
            <th>Nombre Aeropuerto</th>
            <th>Ciudad</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((item, index) => (
            <tr key={index}>
              <td>{item.AER_AEROPUERTO_ID}</td>
              <td>{item.AER_NOMBRE_AEROPUERTO}</td>
              <td>{item.CIU_NOMBRE_CIUDAD}</td>
              <td>{item.PAI_NOMBRE_PAIS}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de tipoNave */}
      <h2 className={styles.h1}>Tipo de Nave</h2>
      <table className={styles.table} border="1">
        <thead>
          <tr>
            <th>Nombre Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tipoNave.map((item, idx) => (
            <tr key={`tipoNave-${idx}`}>
              <td>{item.TIN_NOMBRE_TIPO}</td>
              <td>{item.TIN_DESCRIPCION}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de tipoVuelo */}
      <h2 className={styles.h1}>Tipo de Vuelo</h2>
      <table className={styles.table} border="1">
        <thead>
          <tr>
            <th>Nombre Tipo Vuelo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tipoVuelo.map((item, idx) => (
            <tr key={`tipoVuelo-${idx}`}>
              <td>{item.TIV_NOMBRE_TIPO_VUELO}</td>
              <td>{item.TIV_DESCRIPCION}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de dga */}
      <h2 className={styles.h1}>DGA</h2>
      <table className={styles.table} border="1">
        <thead>
          <tr>
            <th>Fecha Respuesta</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {dga.map((item, idx) => (
            <tr key={`dga-${idx}`}>
              <td>{item.DGA_FECHA_RESPUESTA}</td>
              <td>{item.DGA_OBSERVACION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateFlightPlan;
