// Simulación de llamadas API
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export default {
  async getFlightPlans() {
    await mockDelay();
    return JSON.parse(localStorage.getItem('flightPlans') || '[]');
  },

  async createFlightPlan(planData) {
    await mockDelay();
    const plans = JSON.parse(localStorage.getItem('flightPlans') || '[]');
    const newPlan = { ...planData, id: Date.now() };
    localStorage.setItem('flightPlans', JSON.stringify([...plans, newPlan]));
    return newPlan;
  },

  async updateFlightPlan(id, planData) {
    await mockDelay();
    const plans = JSON.parse(localStorage.getItem('flightPlans') || '[]');
    const updatedPlans = plans.map(plan => 
      plan.id === id ? { ...plan, ...planData } : plan
    );
    localStorage.setItem('flightPlans', JSON.stringify(updatedPlans));
    return { success: true };
  },

  async deleteFlightPlan(id) {
    await mockDelay();
    const plans = JSON.parse(localStorage.getItem('flightPlans') || '[]');
    const filteredPlans = plans.filter(plan => plan.id !== id);
    localStorage.setItem('flightPlans', JSON.stringify(filteredPlans));
    return { success: true };
  }
};