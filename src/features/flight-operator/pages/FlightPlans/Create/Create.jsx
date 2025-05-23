import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateFlightPlan.module.css";
//-------------------------------------------------------------
// +++++++++punto de guardado+++++++++++++
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

  const uniquePaises = Array.from(
    new Set(flightData.map((item) => item.PAI_NOMBRE_PAIS))
  );

  const aeropuertosFiltrados = form.pais
    ? flightData.filter((item) => item.PAI_NOMBRE_PAIS === form.pais)
    : [];

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Crear Plan de Vuelo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de IATA : </label>
          <input
            type="text"
            name="flightNumber"
            value={form.flightNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Seleccionar nave: </label>
          <select
            name="nave"
            value={form.nave || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione una nave
            </option>
            {tipoNave.map((item, idx) => (
              <option key={`tipoNave-${idx}`} value={item.TIN_NOMBRE_TIPO}>
                {item.TIN_NOMBRE_TIPO}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Seleccionar País: </label>
          <select
            name="pais"
            value={form.pais || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione un país
            </option>
            {uniquePaises.map((pais, idx) => (
              <option key={`pais-${idx}`} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Seleccionar aeropuerto: </label>
          <select
            name="aeropuerto"
            value={form.aeropuerto || ""}
            onChange={handleChange}
            required
            disabled={!form.pais} // Deshabilita si no hay país seleccionado
          >
            <option value="" disabled>
              Seleccione un aeropuerto
            </option>
            {aeropuertosFiltrados.map((item, idx) => (
              <option
                key={`aeropuerto-${idx}`}
                value={item.AER_NOMBRE_AEROPUERTO}
              >
                {item.AER_NOMBRE_AEROPUERTO}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha de Salida :</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora de salida :</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Fecha de llegada aproximada :</label>
          <input
            type="date"
            name="arrivalDate"
            value={form.arrivalDate || ""}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="arrivalTime"
            value={form.arrivalTime || ""}
            onChange={handleChange}
            required
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
