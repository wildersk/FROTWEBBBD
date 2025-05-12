import { useParams, useNavigate } from "react-router-dom";
import { useFlightPlans } from "../../../../hooks/useFlightPlans";
import styles from "./Delete.module.css";

const DeleteFlightPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flightPlans, deleteFlightPlan } = useFlightPlans();

  const flightPlan = flightPlans.find((plan) => plan.id === Number(id));

  const handleDelete = () => {
    deleteFlightPlan(Number(id));
    navigate("/flight-operator/dashboard");
  };

  if (!flightPlan) {
    return <div>Plan de vuelo no encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Eliminar Plan de Vuelo</h1>
      <div className={styles.confirmationBox}>
        <p>¿Estás seguro de eliminar el vuelo {flightPlan.flightNumber}?</p>
        <p>
          Origen: {flightPlan.origin} → Destino: {flightPlan.destination}
        </p>

        <div className={styles.buttonGroup}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Confirmar Eliminación
          </button>
          <button
            onClick={() => navigate("/flight-operator/dashboard")}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFlightPlan;
