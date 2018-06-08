const weather_forecast = {
    weather: []
};

export default (state = weather_forecast, action) => {
    switch (action.type) {
        case 'SHOW_WEATHER_FORECAST':
            return {
                ...state,
                weather: action.payload
            };
        default: return state;
    }
};
