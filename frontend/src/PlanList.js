import React from 'react';

const PlanList = ({ plans, onSelectPlan, onAddPlan, selectedPlanId }) => {
  return (
    <div>
      <h2>Plans</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            <button
              style={{
                fontWeight: plan.id === selectedPlanId ? 'bold' : 'normal',
              }}
              onClick={() => onSelectPlan(plan.id)}>
                
              {plan.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => onAddPlan()}>Add New Plan</button>
    </div>
  );
};

export default PlanList;