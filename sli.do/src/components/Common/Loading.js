import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height,
            display: this.props.show?'':'none',
            zIndex: 10,
            position: 'absolute'
        };
        const rippleStyle = {
            transform: 'scale(0.6)'
        };
        return (
            <div className="col-md-12 loading-outer" style={divStyle}>
                <div className='uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
            </div>
        );
    }
}

Loading.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    show: PropTypes.bool.isRequired
}

export default Loading;