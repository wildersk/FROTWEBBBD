import React, { useState } from "react"; // Importa useState
import styles from "./styles.module.css";

const FlightPlanForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    aircraftType: "",
    passengers: "",
    status: "pending",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Número de Vuelo:</label>
          <input
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Resto de campos del formulario... */}

        <div className={styles.buttonGroup}>
          <button type="submit">
            {isEditing ? "Actualizar" : "Crear"} Plan
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightPlanForm;
