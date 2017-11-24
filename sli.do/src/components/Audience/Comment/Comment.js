import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Comment extends Component {
  render() {
    let extraClass = this.props.first ? 'first' : '';
    let comment = this.props.data;
    extraClass += comment.new ? 'new' : '';
    let firstNameLetter = comment.commentator ? comment.commentator.charAt(0) : '';
    return (
      <div className={"list-group-item comment-item " + extraClass}>
        <div className="comment-info">
          <div className="author">
            <div className={"avatar " + firstNameLetter.toLowerCase()}>
              <span>{firstNameLetter}</span>
            </div>
            <div className="info">
              <div className="name">{comment.commentator}</div>
              <div className="more-info">
                <span className="date">{comment.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="action">
            <span>{comment.like_count}</span>
            <a href="javascript:void(0);">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon ui-f-grey-2 icon-size14">
                <title>like-o</title>
                <path d="M22.391 13.397c0.096 0.338 0.145 0.675 0.145 1.013 0 0.723-0.193 1.447-0.579 2.073 0.048 0.193 0.048 0.434 0.048 0.627 0 0.916-0.289 1.832-0.868 2.556 0.048 2.748-1.832 4.34-4.484 4.34h-1.881c-2.025 0-3.954-0.627-5.834-1.254-0.434-0.145-1.591-0.579-1.977-0.579h-4.147c-1.061 0-1.881-0.82-1.881-1.881v-9.21c0-1.013 0.82-1.832 1.881-1.832h3.906c0.579-0.386 1.543-1.688 1.977-2.266 0.53-0.627 1.013-1.254 1.543-1.832 0.868-0.916 0.434-3.182 1.881-4.629 0.338-0.289 0.771-0.53 1.302-0.53 1.495 0 2.941 0.53 3.616 1.929 0.434 0.916 0.53 1.736 0.53 2.7 0 1.013-0.289 1.881-0.723 2.748h2.556c1.977 0 3.665 1.688 3.665 3.713 0 0.82-0.241 1.639-0.675 2.314zM19.402 9.251h-5.063c0-1.688 1.35-2.941 1.35-4.629s-0.289-2.748-2.266-2.748c-0.964 0.916-0.482 3.134-1.881 4.581-0.386 0.434-0.723 0.868-1.109 1.302-0.627 0.868-2.363 3.327-3.472 3.327h-0.482v9.21h0.482c0.771 0 2.122 0.53 2.893 0.82 1.591 0.53 3.231 1.061 4.918 1.061h1.736c1.639 0 2.797-0.675 2.797-2.411 0-0.289-0.048-0.579-0.096-0.82 0.627-0.338 0.964-1.157 0.964-1.832 0-0.338-0.096-0.675-0.289-0.964 0.53-0.482 0.771-1.061 0.771-1.736 0-0.482-0.193-1.157-0.482-1.495 0.675 0 1.061-1.302 1.061-1.832 0-0.964-0.868-1.832-1.832-1.832z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="comment-content">
          {comment.content}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  title: PropTypes.string
}
export default Comment;