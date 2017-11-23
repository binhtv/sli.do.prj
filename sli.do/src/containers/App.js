import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Loading from '../components/Common/Loading';
import constants from '../commons/constants';
import { showMessage } from '../commons/helpers';
import Notifications from 'react-notification-system-redux';
import PUBNUB from 'pubnub';

class App extends Component {
    constructor(props) {
        super(props);
        if (this.props.auth.isAuthenticated()) {
            this.props.gotoPage('admin/events');
        }

        this.pubnub = new PUBNUB({
            publish_key: 'pub-c-7c748e9e-6003-42be-ab7a-b92472d65f44',
            subscribe_key: 'sub-c-30f86508-cee8-11e7-91cc-2ef9da9e0d0e',
        });
        //this.pubnub.init(this);
    }

    componentDidMount() {
        
        this.pubnub.subscribe({
            channels: ['ReactChat']
        });
        this.pubnub.addListener({
            status: (statusEvent) => {
                console.log(statusEvent);
            },
            message: ((message) => {
                this.props.showChat(message.message);
            }).bind(this),
            presence: (presenceEvent) => {
                // handle presence
            }
        });
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: ['ReactChat'] });
    }

    render() {
        const style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    margin: '10px 5px 2px 1px'
                }
            }
        };
        return (<div className="app-home">
            <div className="form-inline">
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-addon">#</div>
                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Event Code"
                            maxLength="10" />
                    </div>
                </div>
                &nbsp;<button type="submit" className="btn btn-success" onClick={e => this.props.joinEvent('/event/1')}>Join</button>
                &nbsp;<button type="submit" className="btn btn-danger" onClick={e => this.props.auth.login()}>Login</button>
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