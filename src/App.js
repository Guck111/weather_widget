import React, {Component} from 'react';

import './App.scss';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import WidgetBody from "./components/WidgetBody";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleMap from './components/GoogleMap';

import {ShowWeatherNow} from "./redux/actions/WeatherNow";
import {ShowWeatherForecast} from "./redux/actions/WeatherForecast";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: [],
            inputValue: '',
            cityImgLink: ''
        };
    }

    componentWillMount() {
        this.getWeatherNow()
    }

    render() {
        return (
            this.props.weather_now.length !== 0 && <div className="widget-content">

                {/*<div className="widget-bg" style={{'backgroundImage': `url(${this.state.cityImgLink})`}}/>*/}
                <div className="widget-bg">
                    <GoogleMap {...this.props.weather_now.coord}/>
                    <div className="widget-bg_color"/>
                </div>

                <div className="widget-body">
                    <h1 className={'title_main'}>WEATHER WIDGET</h1>

                    <ErrorBoundary onWeatherNow={this.getWeatherNow.bind(this)}
                                   onWeatherForecast={this.getWeatherForecast.bind(this)}
                                   isError={this.isError.bind(this)}>
                        <WidgetBody weatherNow={this.props.weather_now} {...this.state}/>
                    </ErrorBoundary>

                    <div className="footer">

                        <div className="container">
                            <div className="city-input__wrap">
                                <input className="city-input__input" value={this.state.inputValue}
                                       onChange={this.updateInputValue.bind(this)} placeholder={'Enter City Name'}/>
                                <button className="city-input__btn"
                                        onClick={() => {
                                            if (this.state.inputValue)
                                                this.getWeatherNow(this.state.inputValue);
                                        }}>
                                    Check weather
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getCityImg(city = 'minsk') {

        let cityImgUrl = '';

        if (city.split(' ').length > 1) {
            cityImgUrl = city.toLowerCase().split(' ').join('_');
        } else {
            cityImgUrl = city.toLowerCase();
        }

        this.setState({
            cityImgLink: `http://localhost:7788/cities/${cityImgUrl}.jpg`
        })
    }

    getWeatherNow(city = 'minsk') {
        this.props.ShowWeatherNow(city)
            .then(() => {
                this.getCityImg(this.props.weather_now.name);
                return this.getWeatherForecast(city)
            })
            .then(() => {
                if (!this.isError())
                    this.clearInput();
            });
    }

    getWeatherForecast(city = 'minsk') {
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
    weather_now: state.WeatherNow.weather
});

const mapDispatchToState = dispatch => bindActionCreators({
    ShowWeatherNow,
    ShowWeatherForecast
}, dispatch);

export default connect(mapStateToProps, mapDispatchToState)(App);
