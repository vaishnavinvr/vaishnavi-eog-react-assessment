import { createSlice } from 'redux-starter-kit';

export type IMetrics = {
  metrics: string[];
  measurements: any;
  selectedMetric: string;
  isLoading: boolean;
};

const initialState = {
  metrics: [],
  measurements: {} as any,
  selectedMetric: '',
  isLoading: false,
} as IMetrics;

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataLoad: (state, action: any) => {
      const { metrics } = action.payload;
      state.metrics = metrics;
    },
    setSelectedMetric: (state, action: any) => {
      state.selectedMetric = action.payload;
    },
    metricsMeasurements: (state, action: any) => {
      const { measurements } = action.payload;
      state.measurements = measurements;
    },
    setDataLoading: (state, action: any) => {
      state.isLoading = action.payload;
    },
  },
});

export const metricsReducer = slice.reducer;
export const metricsActions = slice.actions;
