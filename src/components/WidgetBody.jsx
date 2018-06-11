import React, {Component} from 'react';

import Temp from './Temp'

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
                <div className="city">
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
                                <Temp temperature={this.props.weatherNow.main.temp}/>
                            }
                        </div>

                        <div className="clear"></div>
                    </div>
                </div>

                <div className="forecast">
                    <div className="forecast-icon">
                        <img src={this.state.sky[this.props.weatherNow.weather[0].main]}
                             alt="New York Weather Widget"/>
                    </div>
                    <div className="today-weather">
                        <h3>{this.props.weatherNow.weather[0].main}</h3>
                        <ul>
                            <li>
                                Now <span>{<Temp temperature={this.props.weatherNow.main.temp}/>}</span>
                            </li>

                            {
                                this.props.weatherForecast.length && this.props.weatherForecast.map((item, key) => {
                                    return <li key={key}>{item.dt_txt} <span> {<Temp
                                        temperature={item.main.temp}/>} </span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="clear"></div>

            </div>
        )
    }
}

export default WidgetBody;
