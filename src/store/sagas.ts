import { call, takeLatest } from 'redux-saga/effects';
import {GraphQlService} from '../services';
import {MetricsActions} from './actions';

const metricsServices = new GraphQlService();

export function* getMetricsData() {
  yield call(metricsServices.getMetrics);
}

export const MetricsSaga = [
  takeLatest(MetricsActions.GET_ALL_METRICS, getMetricsData)
]