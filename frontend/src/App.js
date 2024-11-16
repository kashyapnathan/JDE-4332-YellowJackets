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
      <div className="content">
        <div className="sidebar">
          <PlanList
            plans={plans}
            onSelectPlan={setSelectedPlanId}
            onAddPlan={addNewPlan}
            selectedPlanId={selectedPlanId}
          />
        </div>
        <div className="calendar-container">
           {selectedPlan && (
          <Calendar plan={selectedPlan} />
      )}
      </div>
    </div>
    </div>
  );
}

export default App;
