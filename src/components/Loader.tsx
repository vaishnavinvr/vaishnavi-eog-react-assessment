import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../store';
import { useSelector } from 'react-redux';

const getLoaderState = (state: IState) => {
  const { isLoading } = state.metrics;
  return {
    isLoading,
  };
};

export const Loader = () => {
  const {isLoading} = useSelector(getLoaderState);

  return <>{isLoading && <LinearProgress />}</>;
};
