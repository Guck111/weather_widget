import React, {Component} from 'react';
import styled from 'styled-components';

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
                <City>
                    <GoogleMap {...this.props.weatherNow.coord}/>
                    <TitleWrap>
                        <H2>{this.props.weatherNow.name} City</H2>
                        <H3>{this.props.weatherNow.sys.country}</H3>
                    </TitleWrap>
                    <DateTime>
                        <Dmy>
                            <Date>

                            </Date>
                        </Dmy>

                        <MainTemperature>
                            {
                                <Temperature main={true} temperature={this.props.weatherNow.main.temp}/>
                            }
                        </MainTemperature>

                        <div className="clear"/>
                    </DateTime>
                </City>

                <div className="forecast">
                    <div className="forecast-icon">
                        <img src={this.state.sky[this.props.weatherNow.weather[0].main]}
                             alt="Weather Widget"/>
                    </div>
                    <div className="today-weather">
                        <h3>{this.props.weatherNow.weather[0].main}</h3>
                        <ul>
                            <ForecastString>
                                <span>{<Temperature date={'Now'}  temperature={this.props.weatherNow.main.temp}/>}</span>
                            </ForecastString>

                            {
                                this.props.forecast.length && this.props.forecast.map((item, key) => {
                                    return (
                                        <ForecastString key={key}>
                                                {
                                                    <Temperature date={item.dt_txt} temperature={item.main.temp}/>
                                                }
                                        </ForecastString>
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

const City = styled.div`
    width: 60%;
    float: left;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 500px;
    position: relative;
`;

const TitleWrap = styled.div`
        float: right;
        font-family: 'Oxygen', sans-serif;
        padding: 30px 30px 0 0;
        position: relative;    
`;

const H2 = styled.h2`
        font-size: 30px;
        text-align: right;   
`;

const H3 = styled.h3`
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        text-align: right;  
`;

const DateTime = styled.div`
    position: absolute;
    bottom: 0;
    width: 90%;
    padding: 0 30px 10px 30px;
    font-family: 'Oxygen', sans-serif;
`;

const Dmy = styled.div`
    width: 50%;
    float: left;
    text-align: left;
    padding-top: 55px;
`;

const Date = styled.div`
    font-size: 22px;
`;

const MainTemperature = styled.div`
    text-align: center;
    width: 100%;
`;

const ForecastString = styled.li`
    margin: auto;
    width: 73%;
    justify-content: space-between;
`;
