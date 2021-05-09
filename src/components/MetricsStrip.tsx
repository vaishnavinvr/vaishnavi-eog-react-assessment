import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IState } from '../store';
import { MetricsActions } from '../store/actions';

const getMetrics = (state: IState) => {
  const { metrics, selectedMetric } = state.metrics;
  return {
    metrics,
    selectedMetric,
  };
};

let interval: any = null;

export const MetricsStrip = () => {
  const dispatch = useDispatch();
  const { metrics, selectedMetric } = useSelector(getMetrics);

  useEffect(() => {
    if (!metrics.length) {
      dispatch({
        type: MetricsActions.GET_ALL_METRICS,
      });
    }
  }, [dispatch, metrics]);

  const getMetricsMeasurement = (item: string, isLoading: boolean) => {
    dispatchMetric(item, isLoading);
    if (item !== selectedMetric) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      dispatchMetric(item, false);
    }, 1300);
  };

  const dispatchMetric = (item: string, isLoading: boolean) => {
    dispatch({
      type: MetricsActions.GET_METRIC_MEASUREMENTS,
      payload: { item, isLoading },
    });
  };

  return (
    <MetricsContainer>
      <div>
        <b>Metrics: </b>
      </div>
      {metrics &&
        metrics.map(item => {
          return (
            <div
              key={item}
              className={selectedMetric === item ? 'metric-item active' : 'metric-item'}
              onClick={() => getMetricsMeasurement(item, true)}
            >
              {item}
            </div>
          );
        })}
    </MetricsContainer>
  );
};

const MetricsContainer = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  .metric-item {
    &.active {
      background: #25ad9f;
      color: white;
    }
    text-transform: capitalize;
    cursor: pointer;
    border: 1px solid #25ad9f;
    padding: 7px;
    margin: 0px 10px;
    border-radius: 4px;
  }
`;
