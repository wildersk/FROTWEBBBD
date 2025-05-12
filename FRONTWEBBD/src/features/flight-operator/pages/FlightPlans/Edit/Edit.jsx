import { useParams, useNavigate } from "react-router-dom";
import { useFlightPlans } from "../../../../hooks/useFlightPlans";
import FlightPlanForm from "../../../components/FlightPlanForm/FlightPlanForm";
import styles from "./Edit.module.css";

const EditFlightPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flightPlans, updateFlightPlan } = useFlightPlans();

  const flightPlan = flightPlans.find((plan) => plan.id === Number(id));

  const handleSubmit = (formData) => {
    updateFlightPlan(Number(id), formData);
    navigate("/flight-operator/dashboard");
  };

  if (!flightPlan) {
    return <div>Plan de vuelo no encontrado</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Editar Plan de Vuelo {flightPlan.flightNumber}</h1>
      <FlightPlanForm
        initialData={flightPlan}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/flight-operator/dashboard")}
        isEditing={true}
      />
    </div>
  );
};

export default EditFlightPlan;
