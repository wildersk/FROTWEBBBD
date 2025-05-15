import { useState } from "react";

export const useFlightPlans = () => {
  const [flightPlans, setFlightPlans] = useState([
    {
      id: 1,
      flightNumber: "AV-101",
      origin: "Bogotá",
      destination: "Medellín",
      departureTime: "2023-11-15T08:00",
      aircraftType: "Boeing 737",
      passengers: 120,
      status: "confirmed",
    },
  ]);

  const createFlightPlan = (newPlan) => {
    const id = Date.now();
    setFlightPlans([...flightPlans, { ...newPlan, id }]);
    return id;
  };

  const updateFlightPlan = (id, updatedPlan) => {
    setFlightPlans(
      flightPlans.map((plan) =>
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      )
    );
  };

  const deleteFlightPlan = (id) => {
    setFlightPlans(flightPlans.filter((plan) => plan.id !== id));
  };

  return {
    flightPlans,
    createFlightPlan,
    updateFlightPlan,
    deleteFlightPlan,
  };
};
