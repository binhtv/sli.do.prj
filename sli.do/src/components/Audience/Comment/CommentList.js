import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';


class CommentList extends Component {
    render() {
        let comments = <div>No comments</div>;
        if(this.props.comments && this.props.comments.length > 0) {
            comments = this.props.comments.map((comment, index) => {
                return <Comment key={index} data={comment}/>
            });
        }
        return (
            <div className="list-group comment">
                {comments}
            </div>
        );
    }
}

CommentList.propTypes = {
    title: PropTypes.string
}
export default CommentList;