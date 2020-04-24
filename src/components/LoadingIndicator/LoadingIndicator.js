import React from 'react';
import './LoadingIndicator.scss';
import loadingImage from './loading.svg';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <img className="loading-indicator__image" src={ loadingImage } alt="Загрузка" title="Загрузка" />
    </div>
  )
}

export default LoadingIndicator;