import React, {Component} from 'react';
import styled from 'styled-components';

class Temp extends Component {
    render() {
        let t = (this.props.temperature - 273.15).toFixed(1);
        return <Temperature main={this.props.main}><span>{this.props.date}</span><span>{t}°<span>C</span></span></Temperature>;
    }
}

export default Temp;

const Temperature = styled.p`
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-family: ${(props) => props.main ? '\'Raleway\', sans-serif' : '\'Open Sans\', sans-serif'};
        font-size: ${(props) => props.main ? '125px' : '15px'};
        padding-bottom: ${(props) => props.main ? '0' : '15px'};
        color: ${(props) => props.main ? 'black' : '#fff'};
    `;
