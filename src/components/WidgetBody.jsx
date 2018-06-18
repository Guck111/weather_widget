import React, {Component} from 'react';

import Temperature from './Temperature'
import CurrentTime from './CurrentTime'
import GoogleMap from './GoogleMap'

import clouds from '../images/sky/clouds.png';
import clear from '../images/sky/clear.png';
import rain from '../images/sky/rain.png';
import mist from '../images/sky/mist.png';
import thunderstorm from '../images/sky/thunderstorm.png';

class WidgetBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sky: {
                'Clouds': clouds,
                'Clear': clear,
                'Thunderstorm': thunderstorm,
                'Rain': rain,
                'Mist': mist,
            }
        };
    }

    render() {
        return (
            <div className="container">
                <CurrentTime/>
                <div className="city">
                    <GoogleMap {...this.props.weatherNow.coord}/>
                    <div className="title">
                        <h2>{this.props.weatherNow.name} City</h2>
                        <h3>{this.props.weatherNow.sys.country}</h3>
                    </div>
                    <div className="date-time">
                        <div className="dmy">
                            <div className="date">

                            </div>
                        </div>

                        <div className="temperature">
                            {
                                <Temperature temperature={this.props.weatherNow.main.temp}/>
                            }
                        </div>

                        <div className="clear"/>
                    </div>
                </div>

                <div className="forecast">
                    <div className="forecast-icon">
                        <img src={this.state.sky[this.props.weatherNow.weather[0].main]}
                             alt="Weather Widget"/>
                    </div>
                    <div className="today-weather">
                        <h3>{this.props.weatherNow.weather[0].main}</h3>
                        <ul>
                            <li>
                                Now <span>{<Temperature temperature={this.props.weatherNow.main.temp}/>}</span>
                            </li>

                            {
                                this.props.forecast.length && this.props.forecast.map((item, key) => {
                                    return (
                                        <li key={key}>{item.dt_txt}
                                            <span>
                                                {
                                                    <Temperature temperature={item.main.temp}/>
                                                }
                                            </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="clear"/>

            </div>
        )
    }
}

export default WidgetBody;
