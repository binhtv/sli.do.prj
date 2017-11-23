import * as types from '../actions/types';
import constants from '../commons/constants';

const defaultState = {
    eventInfo: {
        id: 1,
        code: 'M321',
        name: 'Binh Birthday',
        date_from: '12/12/1989',
        date_to: '13/12/1989',
        date: '20 - 23 Nov 2017'
    },
    comments: [
        {
            id: 1,
            commentator: 'Tran Binh',
            like_count: 1,
            highlight: 1,
            created: '20 Nov, 7:08am',
            content: 'abc def'
        },
        {
            id: 2,
            commentator: 'Mot Mot',
            like_count: 2,
            highlight: 3,
            created: '21 Nov, 7:08am',
            content: 'aaccd aaa'
        }
    ]
}

const audience = (state = defaultState, action) => {
    switch (action.type) {
        case types.APP_LOAD_CONTENT:
            return {
                ...action.data,
                busy: false,
            };
        case types.AUDIENCE_ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.data]
            }
        default:
            return state;
    }
}

export default audience;