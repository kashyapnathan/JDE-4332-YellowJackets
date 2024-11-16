import React from 'react';

const PlanList = ({ plans, onSelectPlan, onAddPlan, selectedPlanId }) => {
    return (
      <div className="plan-list">
        {plans.map((plan) => (
          <button
            key={plan.id}
            className={`plan-button ${selectedPlanId === plan.id ? 'selected' : ''}`}
            onClick={() => onSelectPlan(plan.id)}
          >
            <i className="fas fa-calendar-alt"></i> {plan.name}
          </button>
        ))}
        <button onClick={onAddPlan} className="plan-button add-plan-button">
          <i className="fas fa-plus"></i> Add New Plan
        </button>
      </div>
    );
  };
export default PlanList;