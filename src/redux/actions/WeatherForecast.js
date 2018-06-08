import axios from 'axios';

export const ShowWeatherForecast = val => async dispatch => {
    const weather = await axios.post(`http://localhost:7788/weather_forecast`, {country: val});
    console.log(weather);
    return dispatch({type: 'SHOW_WEATHER_FORECAST', payload: weather.data});
};
