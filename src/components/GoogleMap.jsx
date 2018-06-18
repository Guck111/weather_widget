import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

import point from '../images/metka.png';

const Point = ({point}) => <div><img src={point} alt=""/></div>;

class SimpleMap extends Component {

    render() {

        let center = {
            lng: this.props.lon,
            lat: this.props.lat
        }

        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100%', width: '100%', position: 'absolute'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyBK1truEf5fuufpajTLJQzfW7Yg-qhJtpk'}}
                    center={center}
                    defaultZoom={11}
                >
                    <Point
                        lat={center.lat}
                        lng={center.lng}
                        point={point}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
