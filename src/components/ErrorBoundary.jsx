import React, {Component} from 'react';

class ErrorBoundary extends Component {

    render() {
        if (this.props.isError()) {
            return <div className="container">

                <div className="city">
                    <div className="title">
                        <h2>Error</h2>
                        <h3>This city does not exist or You made a mistake. Check the data</h3>
                    </div>
                    <div className="date-time">
                        <div className="dmy">
                            <div className="date">

                            </div>
                        </div>

                        <div className="clear"></div>
                    </div>
                </div>

                <div className="forecast">

                </div>

                <div className="clear"></div>

            </div>
        } else {
            console.log('else');
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
