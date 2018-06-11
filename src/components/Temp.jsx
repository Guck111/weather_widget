import React, {Component} from 'react';

class Temp extends Component {
    render() {
        let t = (this.props.temperature - 273.15).toFixed(1);
        return <p>{t}°<span>C</span></p>;
    }
}

export default Temp;
