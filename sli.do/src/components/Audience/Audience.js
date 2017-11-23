import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventInfo from './EventInfo';
import QuestionInput from './QuestionInput';
import CommentList from './Comment/CommentList';

class Audience extends Component {
    render() {
        return (
            <div className="container body-content">
                <EventInfo info={this.props.eventInfo}/>
                <QuestionInput onSendQuestion={this.props.addComment}/>
                <div>10 comments</div>
                <CommentList comments={this.props.comments}/>
            </div>
        );
    }
}

Audience.propTypes = {
    title: PropTypes.string
}
export default Audience;