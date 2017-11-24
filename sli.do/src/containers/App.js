import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Loading from '../components/Common/Loading';
import constants from '../commons/constants';
import { showMessage } from '../commons/helpers';
import Notifications from 'react-notification-system-redux';
import EventList from '../components/Dashboard/EventList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventCode: ''
        }
        this.searchEventByCode = this.searchEventByCode.bind(this);
        this.onChangeEventCode = this.onChangeEventCode.bind(this);
        // if (this.props.auth.isAuthenticated()) {
        //     this.props.gotoPage('admin/events');
        // }
    }

    searchEventByCode() {
        if(!this.state.eventCode || this.state.eventCode.length === 0) {
            return;
        }

        this.props.searchEventByCode(this.state.eventCode);
    }

    onChangeEventCode(e) {
        this.setState({
            eventCode: e.target.value
        });
    }

    render() {
        const style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    margin: '10px 5px 2px 1px'
                }
            }
        };
        let data = this.props.app;
        let eventList = '';
        if(data.events) {
            eventList = <EventList events={data.events} gotoPage={this.props.gotoPage}/>;
        }
        let loginOrDashboard = <button type="submit" className="btn btn-danger" onClick={e => this.props.auth.login()}>Login</button>;
        if(this.props.auth.isAuthenticated()) {
            loginOrDashboard = <button type="submit" className="btn btn-info" onClick={e => this.props.gotoPage('admin/events')}>Dashboard</button>;
        }
        return (<div className="app-home">
            <div className="form-inline">
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-addon">#</div>
                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Event Code"
                            value={this.state.eventCode} onChange={this.onChangeEventCode}
                            maxLength="50" />
                    </div>
                </div>
                &nbsp;<button type="submit" className="btn btn-success" onClick={e => this.searchEventByCode(e.target.value)}>Join</button>
                &nbsp;{loginOrDashboard}
                {eventList}
            </div>
            <Notifications
                notifications={this.props.notifications}
                style={style}
            />
        </div>);
        {/*<div>
                <Loading width="100%" height="100%" show={busy} />
                <TopMenuPanel className={blurClass} title="Terminal Design"
                    saveSigninType={this.props.saveSigninType}
                    newSigninType={this.props.newSigninType}
                    onNewSigninTypePopup={this.props.newSigninTypePopup} />
                <MainContentPanel className={blurClass} {...this.props} />
                <Notifications
                    notifications={this.props.notifications}
                    style={style}
                />
                {popup}
            </div>*/}
    }
}

const mapDispatchToProps = (dispatch, ownProp) => {
    return bindActionCreators(ActionCreators, dispatch);
}

const mapStateToProps = (state = {}, ownProp) => {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);