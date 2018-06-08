import React, {Component} from 'react';

import './App.scss';
import clouds from './images/sky/clouds.png';
import clear from './images/sky/clear.png';
import thunderstorm from './images/sky/thunderstorm.png';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Temp from './components/Temp'

import {ShowWeatherNow} from "./redux/actions/WeatherNow";
import {ShowWeatherForecast} from "./redux/actions/WeatherForecast";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: [],
            sky: {
                'Clouds': clouds,
                'Clear': clear,
                'Thunderstorm': thunderstorm,
            }
        };
    }

    componentWillMount() {
        this.setState({
            inputValue: ''
        });
        this.props.ShowWeatherNow('minsk');
        this.props.ShowWeatherForecast('minsk')
            .then(res => {
                let forecast = res.payload.list.filter((item, index) => {
                    return index >= 0 && index < 4;
                })
                this.setState({'forecast': forecast})
            });


    }

    componentDidUpdate() {
        console.log(this.state.inputValue);
        console.log(this.state.sky[this.props.weather_now.weather[0].main])
        console.log(this.state.sky)
        console.log(this.props.weather_now.weather[0].main)
    }

    render() {
        return (
            this.props.weather_now.length !== 0 && <div>
                <h1 className={'title_main'}>WEATHER WIDGET</h1>

                <div className="container">

                    <div className="city">
                        <div className="title">
                            <h2>{this.props.weather_now.name} City</h2>
                            <h3>{this.props.weather_now.sys.country}</h3>
                        </div>
                        <div className="date-time">
                            <div className="dmy">
                                <div className="date">

                                </div>
                            </div>

                            <div className="temperature">
                                {
                                    <Temp temperature={this.props.weather_now.main.temp}/>
                                }
                            </div>

                            <div className="clear"></div>
                        </div>
                    </div>

                    <div className="forecast">
                        <div className="forecast-icon">
                            <img src={this.state.sky[this.props.weather_now.weather[0].main]} alt="New York Weather Widget"/>
                        </div>
                        <div className="today-weather">
                            <h3>{this.props.weather_now.weather[0].main}</h3>
                            <ul>
                                <li>
                                    Now <span>{<Temp temperature={this.props.weather_now.main.temp}/>}</span>
                                </li>

                                {
                                    this.state.forecast.length && this.state.forecast.map((item, key) => {
                                        return <li key={key}>{item.dt_txt} <span> {<Temp temperature={item.main.temp}/>} </span>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="clear"></div>

                </div>

                <div className="footer">

                    <div className="container">
                        <div className="city-input__wrap">
                            <input className="city-input__input" value={this.state.inputValue}
                                   onChange={this.updateInputValue.bind(this)} placeholder={'Enter City Name'}/>
                            <button className="city-input__btn"
                                    onClick={() => this.props.ShowWeatherNow(this.state.inputValue)}>Check weather
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
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
