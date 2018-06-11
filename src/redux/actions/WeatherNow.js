import axios from 'axios';

export const ShowWeatherNow = val => async dispatch => {
    const weather = await axios.post(`http://localhost:7788/weather_now`, {country: val});
    console.log(1)
    console.log(weather)
    return dispatch({type: 'SHOW_WEATHER_NOW', payload: weather.data});
};
