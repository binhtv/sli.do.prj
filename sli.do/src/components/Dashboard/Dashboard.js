import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventList from './EventList';
import NewEvent from './NewEvent';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let session = this.props.auth.getSession();
        let accessToken = session.accessToken;
        this.props.loadEvents(accessToken);
    }

    render() {
        let session = this.props.auth.getSession();
        let accessToken = session.accessToken;
        let data = this.props.dashboard;
        return (
            <div className="container body-content">
                <EventList events={data.events} gotoPage={this.props.gotoPage} isOwner={true}/>
                <NewEvent onCreateNewEvent={(data) => this.props.createNewEvent(accessToken, data)}/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    title: PropTypes.string
}
export default Dashboard;