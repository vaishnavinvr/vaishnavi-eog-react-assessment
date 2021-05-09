import React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import moment from 'moment';
import styled from 'styled-components';

const getMeasurements = (state: IState) => {
  const { measurements, selectedMetric } = state.metrics;
  return {
    measurements,
    selectedMetric,
  };
};

export const LineGraph = () => {
  const { measurements, selectedMetric } = useSelector(getMeasurements);

  const xValues = measurements.length && measurements.map((x: { at: any }) => moment(new Date(x.at)).format('HH:mm'));
  const yValues = measurements.length && measurements.map((x: { value: any }) => x.value);

  const config = {
    showLink: false,
    displayModeBar: false,
  };

  return (
    <ChartContainer>
      {!xValues && <div className="chart-header">Select a Metric to display Measurements</div>}
      {xValues && yValues && (
        <>
          <div className="metric-value">
            <h3>{selectedMetric.toUpperCase()}</h3>
            <div style={{ fontSize: '40px' }}>{yValues[yValues.length - 1]}</div>
          </div>
          <PlotlyChart
            data={[{ type: 'line', x: xValues, y: yValues }]}
            layout={{ width: 1000, height: 500, title: `${selectedMetric.toUpperCase()} Plot` }}
            config={config}
          />
        </>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  margin-top: 20px;
  .chart-header {
    font-size: 20px;
    font-weight: bold;
  }
  .metric-value {
    background: #ffffff;
    border-radius: 5px;
    height: 150px;
    width: 200px;
    padding: 5px;
    margin-right: 50px;
    text-align: center;
  }
`;
