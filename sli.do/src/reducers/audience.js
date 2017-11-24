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
        default:
            return state;
    }
}

export default audience;