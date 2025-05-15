import { Link } from "react-router-dom";
import { useFlightPlans } from "../../hooks/useFlightPlans";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { flightPlans } = useFlightPlans();

  return (
    <div className={styles.container}>
      <h1>Panel de Operador de Vuelos</h1>

      <div className={styles.actions}>
        <Link to="/flight-operator/flight-plans/create" className={styles.card}>
          ✈️ Crear Nuevo Plan
        </Link>
      </div>

      <div className={styles.flightList}>
        <h2>Planes de Vuelo Existentes</h2>
        {flightPlans.length === 0 ? (
          <p>No hay planes de vuelo registrados</p>
        ) : (
          <ul>
            {flightPlans.map((plan) => (
              <li key={plan.id} className={styles.flightItem}>
                <span>{plan.flightNumber}</span>
                <span>
                  {plan.origin} → {plan.destination}
                </span>
                <span>Fecha: {plan.date}</span>
                <span>Hora: {plan.time}</span>
                <div>
                  <Link
                    to={`/flight-operator/flight-plans/edit/${plan.id}`}
                    className={styles.editLink}
                  >
                    Editar
                  </Link>
                  <Link
                    to={`/flight-operator/flight-plans/delete/${plan.id}`}
                    className={styles.deleteLink}
                  >
                    Eliminar
                  </Link>
                  <button
                    onClick={() => handleSendToDGAC(plan.id)}
                    className={styles.editLink}
                  >
                    Enviar a la DGAC
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  function handleSendToDGAC(planId) {
    // Implementar lógica para enviar el plan a la DGAC
    console.log(`Enviando plan ${planId} a la DGAC`);
  }
};

export default Dashboard;
