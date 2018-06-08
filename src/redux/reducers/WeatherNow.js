const weather_now = {
    weather: []
};

export default (state = weather_now, action) => {
    switch (action.type) {
        case 'SHOW_WEATHER_NOW':
            return {
                ...state,
                weather: action.payload
            };
        default: return state;
    }
};
