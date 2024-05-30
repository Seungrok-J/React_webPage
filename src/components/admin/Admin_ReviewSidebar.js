import React from 'react';
import { useReviewProcess } from './Admin_ReviewContext'; // Context 사용
import './Admin_ReviewSidebar.css'; // CSS 파일 임포트

function ReviewSidebar() {
  const { steps, currentStep } = useReviewProcess();

  return (
    <div className="review-sidebar">
      <ul className="steps">
        {steps.map((step, index) => (
          <li key={index} className={index === currentStep ? 'current' : index < currentStep ? 'completed' : 'pending'}>
            <span className="icon">{index < currentStep ? '✓' : index === currentStep ? '•' : ''}</span>
            {step.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewSidebar;
