import React from 'react';
import ErrorBoundry from '../ErrorBoundry';

const withErrorBoundry = (View) => {

  return (props) => {
    return (
      <ErrorBoundry>
        <View { ...props } />
      </ErrorBoundry>
    )
  }
}

export default withErrorBoundry;
