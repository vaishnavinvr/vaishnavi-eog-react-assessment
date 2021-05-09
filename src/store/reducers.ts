import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { metricsReducer } from './metricsReducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
};
