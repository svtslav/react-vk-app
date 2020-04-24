import { useState, useEffect, useMemo } from 'react';

const useData = (getData) => {

  const initialState = useMemo(() => {
    return {
      data: null,
      isLoaded: false,
      error: null
    }
  }, []);

  const [ state, setState ] = useState(initialState);

  useEffect(
    () => {
      setState(initialState);
      let isCancelled = false;
      getData()
      .then((data) => {
        !isCancelled && setState({
          data: data,
          isLoaded: true,
          error: null
        });
      })
      .catch((error) => {
        setState({
          data: null,
          isLoaded: true,
          error: error
        });
      });
      return () => {
        isCancelled = true;
      }
    },
    [ getData, initialState ]
  );
  return state;
}

export default useData;