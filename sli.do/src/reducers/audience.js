import * as types from '../actions/types';
import constants from '../commons/constants';

const defaultState = {
    eventInfo: {},
    comments: []
}

const audience = (state = defaultState, action) => {
    switch (action.type) {
        case types.AUDIENCE_ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.data]
            }
        case types.AUDIENCE_EVENT_DETAIL_LOADED:
            return {
                ...state,
                ...action.data
            }
        case types.AUDIENCE_PUB_ON_NEW_COMMENT_ADDED:
            return {
                ...state,
                comments: state.comments ? [...state.comments, action.data] : [action.data]
            }
        case types.AUDIENCE_PUB_ON_COMMENT_UPDATE:
            let newComments = state.comments.map(comment => comment.id === action.data.id?action.data: comment);
            newComments.sort((a, b) => {
                let compared = b.like_count - a.like_count;
                if(compared === 0) {
                    let bTime = new Date(b.createdAt).getTime();
                    let aTime = new Date(a.createdAt).getTime();
                    compared = aTime - bTime;
                }
                return compared;
            });
            return {
                ...state,
                comments: newComments.filter(comment => !comment.deleted)
            }
        default:
            return state;
    }
}

export default audience;