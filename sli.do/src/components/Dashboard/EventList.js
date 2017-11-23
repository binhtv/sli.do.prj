import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event from './Event';


class EventList extends Component {
    render() {
        return (
            <div className="list-group">
                <Event/>
                <Event/>
                <Event/>
                <Event/>
            </div>
        );
    }
}

EventList.propTypes = {
    title: PropTypes.string
}
export default EventList;