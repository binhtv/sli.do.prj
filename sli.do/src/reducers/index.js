import { combineReducers } from 'redux';
import dashboard from './dashboard';
import audience from './audience';
import {reducer as notifications} from 'react-notification-system-redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../actions/types';

const app = (state = {}, action) => {
    switch(action.type) {
        case types.APP_USER_LOADED:
        if(!action.data) {
            return state;
        }
        return {
            ...state,
            userInfo: action.data
        }
        default:
        return state;
    }
}

const sliApp = combineReducers({
    app,
    audience,
    dashboard,
    notifications,
    routing 
});


export default sliApp;