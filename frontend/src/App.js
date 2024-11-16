import './App.css';
import React, { useEffect, useState } from 'react';
import PlanList from './PlanList';
import Navbar from './Navbar';
import Calendar from './Calendar';

const App = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => { setSelectedPlan(plans.find(plan => plan.id === selectedPlanId)); }, [selectedPlanId, plans]);

  const addNewPlan = () => {
    const newPlan = {id: Date.now(), name: `Plan ${plans.length + 1}`, events: [] };
    setPlans([...plans, newPlan]);
  }

  return (
    <div className="App">
      <Navbar /> 

      <PlanList
        plans={plans}
        onSelectPlan={setSelectedPlanId}
        onAddPlan={addNewPlan}
        selectedPlanId={selectedPlanId}
      />

      {selectedPlan && (
          <Calendar plan={selectedPlan} />
      )}
    </div>
  );
}

export default App;
