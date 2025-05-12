import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlightPlans } from "../../../hooks/useFlightPlans";
import styles from "./CreateFlightPlan.module.css";

const CreateFlightPlan = () => {
  const navigate = useNavigate();
  const { createFlightPlan } = useFlightPlans();

  const [codigoIATA, setCodigoIATA] = useState("");
  const [origen, setOrigen] = useState("");
  const [tipoAvion, setTipoAvion] = useState("");
  const [avion, setAvion] = useState("");
  const [escala, setEscala] = useState("");
  const [escalas, setEscalas] = useState([]);
  const [piloto, setPiloto] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechaLlegada, setFechaLlegada] = useState("");

  const tiposAvion = ["Comercial", "Privado", "Carga"];
  const avionesPorTipo = {
    Comercial: ["Boeing 747", "Airbus A320"],
    Privado: ["Cessna Citation", "Gulfstream G650"],
    Carga: ["Antonov An-225", "Boeing 767 Freighter"],
  };
  const pilotosDisponibles = [
    { nombre: "Juan Pérez", licencia: "Comercial" },
    { nombre: "Ana Gómez", licencia: "Privado" },
    { nombre: "Carlos Rodríguez", licencia: "Carga" },
  ];

  const handleAddEscala = () => {
    if (escalas.length < 3) {
      setEscalas([...escalas, { aeropuertos: [""] }]);
    } else {
      alert("Solo se permiten hasta 3 escalas.");
    }
  };

  const handleAddAeropuerto = (index) => {
    const newEscalas = [...escalas];
    if (newEscalas[index].aeropuertos.length < 3) {
      newEscalas[index].aeropuertos.push("");
      setEscalas(newEscalas);
    } else {
      alert("Solo se permiten hasta 3 aeropuertos por escala.");
    }
  };

  const handleChangeAeropuerto = (escalaIndex, aeropuertoIndex, value) => {
    const newEscalas = [...escalas];
    newEscalas[escalaIndex].aeropuertos[aeropuertoIndex] = value;
    setEscalas(newEscalas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !codigoIATA ||
      !origen ||
      !tipoAvion ||
      !avion ||
      !piloto ||
      !fechaSalida ||
      !fechaLlegada
    ) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    const formData = {
      codigoIATA,
      origen,
      tipoAvion,
      avion,
      escalas,
      piloto,
      fechaSalida,
      fechaLlegada,
    };

    const id = createFlightPlan(formData);
    navigate(`/flight-operator/flight-plans/edit/${id}`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Crear Nuevo Plan de Vuelo</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Código IATA:</label>
        <input
          type="text"
          value={codigoIATA}
          onChange={(e) => setCodigoIATA(e.target.value)}
          placeholder="Ej. MIA, LAX"
          className={styles.input}
        />

        <label className={styles.label}>Origen:</label>
        <input
          type="text"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          placeholder="Ciudad de origen"
          className={styles.input}
        />

        <label className={styles.label}>Tipo de Avión:</label>
        <select
          value={tipoAvion}
          onChange={(e) => setTipoAvion(e.target.value)}
          className={styles.select}
        >
          <option value="">Seleccionar</option>
          {tiposAvion.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        {tipoAvion && (
          <>
            <label className={styles.label}>Avión:</label>
            <select
              value={avion}
              onChange={(e) => setAvion(e.target.value)}
              className={styles.select}
            >
              <option value="">Seleccionar</option>
              {avionesPorTipo[tipoAvion].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </>
        )}

        <label className={styles.label}>¿Añadir Escala?</label>
        <select
          value={escala}
          onChange={(e) => setEscala(e.target.value)}
          className={styles.select}
        >
          <option value="">Seleccionar</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        {escala === "Si" && (
          <>
            <button
              type="button"
              onClick={handleAddEscala}
              className={styles.button}
            >
              Añadir Escala
            </button>
            {escalas.map((escala, escalaIndex) => (
              <div key={escalaIndex} className={styles.escala}>
                <h4>Escala {escalaIndex + 1}</h4>
                {escala.aeropuertos.map((aeropuerto, aeropuertoIndex) => (
                  <div key={aeropuertoIndex}>
                    <label className={styles.label}>
                      Aeropuerto {aeropuertoIndex + 1}:
                    </label>
                    <input
                      type="text"
                      value={aeropuerto}
                      onChange={(e) =>
                        handleChangeAeropuerto(
                          escalaIndex,
                          aeropuertoIndex,
                          e.target.value
                        )
                      }
                      placeholder="Nombre del aeropuerto"
                      className={styles.input}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddAeropuerto(escalaIndex)}
                  className={styles.button}
                >
                  Añadir Aeropuerto
                </button>
              </div>
            ))}
          </>
        )}

        <label className={styles.label}>Piloto:</label>
        <select
          value={piloto}
          onChange={(e) => setPiloto(e.target.value)}
          className={styles.select}
        >
          <option value="">Seleccionar</option>
          {pilotosDisponibles.map((p) => (
            <option key={p.nombre} value={p.nombre}>
              {p.nombre} - {p.licencia}
            </option>
          ))}
        </select>

        <label className={styles.label}>Fecha de Salida:</label>
        <input
          type="datetime-local"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Fecha de Llegada:</label>
        <input
          type="datetime-local"
          value={fechaLlegada}
          onChange={(e) => setFechaLlegada(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateFlightPlan;
