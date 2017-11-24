import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event from './Event';


class EventList extends Component {
    render() {
        let events = <div>No Event</div>
        if (this.props.events && this.props.events.length > 0) {
            events = this.props.events.map(event => {
                return <Event key={event.id} event={event} gotoPage={this.props.gotoPage} isOwner={this.props.isOwner}/>
            });
        }
        return (
            <div className="list-group">
                {events}
            </div>
        );
    }
}

EventList.propTypes = {
    title: PropTypes.string
}
export default EventList;