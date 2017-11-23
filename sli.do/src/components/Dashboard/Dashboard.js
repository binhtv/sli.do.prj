import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventList from './EventList';
import NewEvent from './NewEvent';


class Dashboard extends Component {
    render() {
        return (
            <div className="container body-content">
                <EventList/>
                <NewEvent/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    title: PropTypes.string
}
export default Dashboard;