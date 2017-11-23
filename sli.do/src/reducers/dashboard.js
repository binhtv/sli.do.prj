import * as types from '../actions/types';
import constants from '../commons/constants';

const dashboard = (state = {}, action) => {
    if (Object.keys(types).indexOf(action.type) === -1) {
        return state;
    }

    switch (action.type) {
        case types.APP_LOAD_CONTENT:
            return {
                ...action.data,
                busy: false,
            };
        default: 
        return state;
    }
}

export default dashboard;