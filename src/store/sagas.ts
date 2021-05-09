import { call, put, takeLatest } from 'redux-saga/effects';
import { GraphQlService } from '../services';
import { MetricsActions } from './actions';
import { metricsActions } from './metricsReducer';
import { toast } from 'react-toastify';

const metricsServices = new GraphQlService();

interface IMetrics {
  query: [];
}

interface IMetricsMeasurements {
  getMeasurements: [];
}

export function* getMetricsData() {
  try {
    yield put(metricsActions.setDataLoading(true));
    const metricsResponse: IMetrics = yield call(metricsServices.getMetrics);
    yield put(metricsActions.metricsDataLoad({ metrics: metricsResponse.query }));
    yield put(metricsActions.setDataLoading(false));
  } catch (err) {
    yield call(toast.error, `Error Received: ${err}`);
  }
}

export function* getMetricsMeasurement(action: any) {
  try {
    yield put(metricsActions.setDataLoading(action.payload.isLoading));
    yield put(metricsActions.setSelectedMetric(action.payload.item));
    const dateTime = new Date().getTime();
    const metricsResponse: IMetricsMeasurements = yield call(
      metricsServices.getMeasurements,
      action.payload.item,
      dateTime - 1800000,
      dateTime,
    );
    yield put(metricsActions.metricsMeasurements({ measurements: metricsResponse.getMeasurements }));
    yield put(metricsActions.setDataLoading(false));
  } catch (err) {
    yield call(toast.error, `Error Received: ${err}`);
  }
}

export const MetricsSaga = [
  takeLatest(MetricsActions.GET_ALL_METRICS, getMetricsData),
  takeLatest(MetricsActions.GET_METRIC_MEASUREMENTS, getMetricsMeasurement),
];
