import React from 'react';
import './ErrorIndicator.scss';

const ErrorIndicator = ({ error }) => {
  return (
    <div className="error-indicator">
      <div>
        Упс! Что-то пошло не так...
      </div>
      <div>
        { error.name } { error.message }
      </div>
    </div>
  )
}

export default ErrorIndicator;