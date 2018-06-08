import React, {Component} from 'react';

class Country extends Component {
    render() {
        console.log(this.props.temperature)
        let t = (this.props.temperature - 273.15).toFixed(1);
        return <p>{t}°<span>C</span></p>;
    }
}

export default Country;
