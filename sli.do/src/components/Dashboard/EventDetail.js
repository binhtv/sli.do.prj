import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventInfo from '../Audience/EventInfo';
import CommentList from '../Audience/Comment/CommentList';
import PUBNUB from 'pubnub';


class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.updateComment = this.updateComment.bind(this);
        this.pubnub = new PUBNUB({
            publish_key: 'pub-c-7c748e9e-6003-42be-ab7a-b92472d65f44',
            subscribe_key: 'sub-c-30f86508-cee8-11e7-91cc-2ef9da9e0d0e',
        });
    }

    componentDidMount() {
        let session = this.props.auth.getSession();
        let accessToken = session.accessToken;
        this.props.loadEventDetail(accessToken, this.props.params.id);
        this.pubnub.addListener({
            status: (statusEvent) => {
                console.log(statusEvent);
            },
            message: ((message) => {
                let data = JSON.parse(message.message);
                if(message.channel === this.props.dashboard.eventInfo.code) {
                    this.props.pubOnNewComment(data);
                } else if(message.channel === `comment_update${this.props.dashboard.eventInfo.id}`) {
                    this.props.pubOnUpdateComment(data);
                }
            }).bind(this),
            presence: (presenceEvent) => {
                // handle presence
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (!Object.is(nextProps.dashboard.eventInfo, this.props.dashboard.eventInfo)) {
            if (nextProps.dashboard.eventInfo) {
                this.pubnub.subscribe({
                    channels: [nextProps.dashboard.eventInfo.code, `comment_update${nextProps.dashboard.eventInfo.id}`]
                });
            } else {
                this.props.gotoPage('/');
            }
        }
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: [this.props.dashboard.eventInfo.code, `comment_update${this.props.dashboard.eventInfo.id}`] });
    }

    updateComment(data) {
        this.props.updateComment(data.id, data.data);
    }

    render() {
        let session = this.props.auth.getSession();
        let accessToken = session.accessToken;
        let data = this.props.dashboard;
        return (
            <div className="container body-content">
                <EventInfo info={data.eventInfo} isOwner={true}/>
                <CommentList comments={data.comments} isOwner={true} onUpdateComment={this.updateComment}/>
            </div>
        );
    }
}

EventDetail.propTypes = {
    title: PropTypes.string
}
export default EventDetail;