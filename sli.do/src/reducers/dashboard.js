import * as types from '../actions/types';
import constants from '../commons/constants';

const defaultState = {
    events: [],
    eventInfo: {},
    comments: []
}
const dashboard = (state = defaultState, action) => {
    switch (action.type) {
        case types.DASHBOARD_ADD_NEW_EVENT:
            return {
                ...state,
                events: state.events.length === 0 ? [action.data] : [action.data, ...state.events]
            }
        case types.DASHBOARD_EVENTS_LOADED:
            return {
                ...state,
                events: action.data
            }
        case types.DASHBOARD_EVENT_DETAIL_LOADED:
            return {
                ...state,
                ...action.data
            }
        case types.DASHBOARD_PUB_ON_NEW_COMMENT_ADDED:
            return {
                ...state,
                comments: state.comments ? [...state.comments, action.data] : [action.data]
            }
        case types.DASHBOARD_PUB_ON_COMMENT_UPDATE:
            let newComments = state.comments.map(comment => comment.id === action.data.id ? action.data : comment);
            newComments.sort((a, b) => {
                return b.like_count - a.like_count;
            });
            return {
                ...state,
                comments: newComments.filter(comment => !comment.deleted)
            }
        default:
            return state;
    }
}

export default dashboard;