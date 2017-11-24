import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import $ from 'jquery';
import 'jquery-ui/ui/effects/effect-highlight';

class CommentList extends Component {
    componentDidUpdate(prevProps, prevState) {
        let scrollTo = $('div.comment-item.new').last();
        let container = $('div.list-group');
        if (container.length > 0 && scrollTo.length > 0) {
            var ctop = container.offset().top;
            var scTop = scrollTo.offset().top 
            scrollTo.effect("highlight", {}, 2000);
            container.animate({
                scrollTop: scTop - ctop + container.scrollTop()
            });
        }
    }

    render() {
        let comments = <div>No comments</div>;
        if (this.props.comments && this.props.comments.length > 0) {
            comments = this.props.comments.map((comment, index) => {
                return <Comment key={index} data={comment} />
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