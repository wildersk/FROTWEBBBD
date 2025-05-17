import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listarIncidente.css"; // Importamos el archivo CSS

const ListarIncidente = () => {
  const [incidentes, setIncidentes] = useState([]);

  useEffect(() => {
    const fetchIncidentes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/listar_incidentes_seguridad"
        );
        setIncidentes(response.data);
      } catch (error) {
        console.error("Error fetching incidentes:", error);
      }
    };

    fetchIncidentes();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Incidentes Registrados</h1>
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Prioridad</th>
            <th>Responsable</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {incidentes.map((incidente, index) => (
            <tr key={index}>
              <td>{incidente[0]}</td>
              <td>{incidente[1]}</td>
              <td>{incidente[2]}</td>
              <td>{incidente[3]}</td>
              <td>{incidente[4]}</td>
              <td>{new Date(incidente[5]).toLocaleDateString()}</td>
              <td>{incidente[6]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarIncidente;
