import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventInfo from './EventInfo';
import QuestionInput from './QuestionInput';
import CommentList from './Comment/CommentList';
import PUBNUB from 'pubnub';

class Audience extends Component {
    constructor(props) {
        super(props);
        this.updateComment = this.updateComment.bind(this);
        this.pubnub = new PUBNUB({
            publish_key: 'pub-c-7c748e9e-6003-42be-ab7a-b92472d65f44',
            subscribe_key: 'sub-c-30f86508-cee8-11e7-91cc-2ef9da9e0d0e',
        });
    }

    updateComment(data) {
        this.props.updateComment(data.id, data.data);
    }

    componentDidMount() {
        this.props.loadEventDetailAudience(this.props.params.id);
        this.pubnub.addListener({
            status: (statusEvent) => {
                console.log(statusEvent);
            },
            message: ((message) => {
                let data = JSON.parse(message.message);
                if(message.channel === this.props.eventInfo.code) {
                    this.props.pubOnNewCommentAudience(data);
                } else if(message.channel === (`comment_update${this.props.eventInfo.id}`)) {
                    this.props.pubOnUpdateCommentAudience(data);
                }
            }).bind(this),
            presence: (presenceEvent) => {
                // handle presence
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.eventInfo || !nextProps.eventInfo.id) {
            this.props.gotoPage('/');
        }
        if (!Object.is(nextProps.eventInfo, this.props.eventInfo)) {
            if (nextProps.eventInfo) {
                this.pubnub.subscribe({
                    channels: [nextProps.eventInfo.code, `comment_update${nextProps.eventInfo.id}`]
                });
            }
        }
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: [this.props.eventInfo.code, `comment_update${this.props.eventInfo.id}`] });
    }

    render() {
        return (
            <div className="container body-content">
                <EventInfo info={this.props.eventInfo} />
                <QuestionInput onSendQuestion={this.props.addComment} eventInfo={this.props.eventInfo}/>
                <div>{(this.props.comments && this.props.comments.length) ? this.props.comments.length : 0} comments</div>
                <CommentList comments={this.props.comments} onUpdateComment={this.updateComment}/>
            </div>
        );
    }
}

Audience.propTypes = {
    title: PropTypes.string
}
export default Audience;