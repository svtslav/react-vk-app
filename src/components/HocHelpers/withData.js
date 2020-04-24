import React from 'react';
import { useData } from '../../hooks';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';

const withData = (View) => {

  return (props) => {

    const { data, isLoaded, error } = useData(props.getData);

    if (!isLoaded) {
      return <LoadingIndicator />
    }
    if (error) {
      return <ErrorIndicator error = { error } />
    }
    return <View { ...props } data = { data }/>
  }
}

export default withData;
