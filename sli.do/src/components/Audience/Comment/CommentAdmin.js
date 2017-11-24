import React, { Component } from 'react';
import PropTypes from 'prop-types';


class CommentAdmin extends Component {
  constructor(props) {
    super(props);
    // this.onLike = this.onLike.bind(this);
  }

  // onLike() {
  //   let likes = localStorage.getItem('likes');
  //   likes = likes?likes : [];
  //   let liked = likes.indexOf(this.props.data.id) !== -1;
  //   localStorage.setItem('likes', [...likes, this.props.data.id]);
  //   this.props.onUpdateComment(this.props.data.id, {
  //       liked
  //   });
  // }

  render() {
    let extraClass = this.props.first ? 'first' : '';
    let comment = this.props.data;
    extraClass += comment.new ? 'new' : '';
    let firstNameLetter = comment.commentator ? comment.commentator.charAt(0) : '';
    let likes = localStorage.getItem('likes');
    let liked = '';
    if (likes && likes.indexOf(comment.id) !== -1) {
      liked = 'like';
    }
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
                <span>{comment.like_count}</span>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon ui-f-grey-2 icon-size14">
                  <title>like-o</title>
                  <path d="M22.391 13.397c0.096 0.338 0.145 0.675 0.145 1.013 0 0.723-0.193 1.447-0.579 2.073 0.048 0.193 0.048 0.434 0.048 0.627 0 0.916-0.289 1.832-0.868 2.556 0.048 2.748-1.832 4.34-4.484 4.34h-1.881c-2.025 0-3.954-0.627-5.834-1.254-0.434-0.145-1.591-0.579-1.977-0.579h-4.147c-1.061 0-1.881-0.82-1.881-1.881v-9.21c0-1.013 0.82-1.832 1.881-1.832h3.906c0.579-0.386 1.543-1.688 1.977-2.266 0.53-0.627 1.013-1.254 1.543-1.832 0.868-0.916 0.434-3.182 1.881-4.629 0.338-0.289 0.771-0.53 1.302-0.53 1.495 0 2.941 0.53 3.616 1.929 0.434 0.916 0.53 1.736 0.53 2.7 0 1.013-0.289 1.881-0.723 2.748h2.556c1.977 0 3.665 1.688 3.665 3.713 0 0.82-0.241 1.639-0.675 2.314zM19.402 9.251h-5.063c0-1.688 1.35-2.941 1.35-4.629s-0.289-2.748-2.266-2.748c-0.964 0.916-0.482 3.134-1.881 4.581-0.386 0.434-0.723 0.868-1.109 1.302-0.627 0.868-2.363 3.327-3.472 3.327h-0.482v9.21h0.482c0.771 0 2.122 0.53 2.893 0.82 1.591 0.53 3.231 1.061 4.918 1.061h1.736c1.639 0 2.797-0.675 2.797-2.411 0-0.289-0.048-0.579-0.096-0.82 0.627-0.338 0.964-1.157 0.964-1.832 0-0.338-0.096-0.675-0.289-0.964 0.53-0.482 0.771-1.061 0.771-1.736 0-0.482-0.193-1.157-0.482-1.495 0.675 0 1.061-1.302 1.061-1.832 0-0.964-0.868-1.832-1.832-1.832z"></path>
                </svg>
                <span className="date">{comment.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="action">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-size24">
              <title>highlight</title>
              <path d="M12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zM12 23.284c-6.234 0-11.284-5.050-11.284-11.284s5.050-11.284 11.284-11.284 11.284 5.050 11.284 11.284-5.050 11.284-11.284 11.284v0z"></path>
              <path d="M8.781 16.704l-0.989-0.989 4.208-4.209 4.209 4.209-0.99 0.989-3.219-3.213-3.219 3.213zM8.781 12.495l-0.989-0.989 4.208-4.209 4.209 4.209-0.99 0.989-3.219-3.213z"></path>
            </svg>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-size24">
              <title>edit</title>
              <path d="M21.374 11.251c-0.624 0-1.123 0.504-1.123 1.123v9.374h-18v-18h9.374c0.624 0 1.123-0.504 1.123-1.123s-0.504-1.123-1.123-1.123h-10.123c-0.83-0.005-1.502 0.667-1.502 1.498v19.498c0 0.83 0.672 1.502 1.502 1.502h19.498c0.826 0 1.498-0.672 1.498-1.498v-10.128c0.005-0.619-0.499-1.123-1.123-1.123zM23.736 3.49l-3.226-3.23c-0.178-0.178-0.408-0.259-0.634-0.259s-0.461 0.086-0.634 0.264l-12.494 12.485v4.502h4.502l12.485-12.49c0.178-0.178 0.264-0.408 0.264-0.638s-0.086-0.461-0.264-0.634zM10.502 15h-1.498v-1.498l10.872-10.877 1.498 1.498-10.872 10.877z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
              className="icon icon-size24" viewBox="0 0 774.266 774.266" style={{ enableBackground: "new 0 0 774.266 774.266" }}>
              <g>
                <g>
                  <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"
                    fill="#c73232" />
                  <rect x="475.031" y="286.593" width="48.418" height="396.942" fill="#c73232" />
                  <rect x="363.361" y="286.593" width="48.418" height="396.942" fill="#c73232" />
                  <rect x="251.69" y="286.593" width="48.418" height="396.942" fill="#c73232" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="comment-content">
          {comment.content}
        </div>
      </div >
    );
  }
}

CommentAdmin.propTypes = {
  title: PropTypes.string
}
export default CommentAdmin;