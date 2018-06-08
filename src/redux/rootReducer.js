import { combineReducers } from 'redux';
import WeatherNow from './reducers/WeatherNow';
import WeatherForecast from './reducers/WeatherForecast';

export default combineReducers({
    WeatherNow,
    WeatherForecast
})
