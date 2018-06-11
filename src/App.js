import React, {Component} from 'react';

import './App.scss';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {ShowWeatherNow} from "./redux/actions/WeatherNow";
import {ShowWeatherForecast} from "./redux/actions/WeatherForecast";
import WidgetBody from "./components/WidgetBody";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: [],
            inputValue: ''
        };
    }

    componentWillMount() {
        this.getWeatherNow('minsk')
    }

    render() {
        return (
            this.props.weather_now.length !== 0 && <div>
                <h1 className={'title_main'}>WEATHER WIDGET</h1>

                <ErrorBoundary onWeatherNow={this.getWeatherNow.bind(this)}
                               onWeatherForecast={this.getWeatherForecast.bind(this)}
                               isError={this.isError.bind(this)}>
                    <WidgetBody weatherNow={this.props.weather_now} weatherForecast={this.state.forecast}/>
                </ErrorBoundary>

                <div className="footer">

                    <div className="container">
                        <div className="city-input__wrap">
                            <input className="city-input__input" value={this.state.inputValue}
                                   onChange={this.updateInputValue.bind(this)} placeholder={'Enter City Name'}/>
                            <button className="city-input__btn"
                                    onClick={() => this.getWeatherNow(this.state.inputValue)}>
                                Check weather
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getWeatherNow(city) {
        this.props.ShowWeatherNow(city)
            .then(() => {
                return this.getWeatherForecast(city)
            })
            .then(() => {
                if(!this.isError())
                    this.clearInput();
            });
    }

    getWeatherForecast(city) {
        this.props.ShowWeatherForecast(city)
            .then(res => {
                let forecast = res.payload.list.filter((item, index) => {
                    return index >= 0 && index < 4;
                });
                this.setState({'forecast': forecast})
            });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    clearInput() {
        this.setState({
            inputValue: ''
        });
    }

    isError() {
        if (this.props.weather_now === 404)
            return true;
    }
}

const mapStateToProps = state => ({
    weather_now: state.WeatherNow.weather,
    weather_forecast: state.WeatherForecast.weather
});

const mapDispatchToState = dispatch => bindActionCreators({
    ShowWeatherNow,
    ShowWeatherForecast
}, dispatch);

export default connect(mapStateToProps, mapDispatchToState)(App);
