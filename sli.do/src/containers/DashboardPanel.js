import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import TopMenu from '../components/TopMenu/TopMenu';
import Dashboard from '../components/Dashboard/Dashboard';
import constants from '../commons/constants';
import Notifications from 'react-notification-system-redux';

class DashboardPanel extends Component {
    constructor(props) {
        super(props);
        if(!this.props.auth.isAuthenticated()) {
            this.props.auth.logout();
            this.props.gotoPage('/');
        }
    }

    getUserInfo() {
        if(!this.props.auth.isAuthenticated()) {
            return null;
        }

        let userInfo = this.props.app.userInfo;
        let session = this.props.auth.getSession();
        if (!session) {
            this.props.gotoPage('/');
        }

        if (!userInfo) {
            this.props.loadUserInfo(session.accessToken);
        }
        return userInfo;
    }

    render() {
        let userInfo = this.getUserInfo();
        const style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    margin: '10px 5px 2px 1px'
                }
            }
        };
        return (
            <div>
                <TopMenu userInfo={userInfo} />
                <Dashboard/>
                <Notifications
                    notifications={this.props.notifications}
                    style={style}
                />
            </div>
        );
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
)(DashboardPanel);