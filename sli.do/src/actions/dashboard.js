import fetch from 'isomorphic-fetch';
import configs from '../commons/configs';
import * as types from './types';
import { showMessage } from '../commons/helpers';
import constants from '../commons/constants';
import { push } from 'react-router-redux';
export function createNewEvent(accessToken, data) {
    let postData = new FormData();
    postData.append('access_token', accessToken);
    postData.append('data', JSON.stringify(data));
    return dispatch => {
        return fetch(`${configs.apiUrl}/create-event`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: postData,
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Internal Server Error.');
            }).then(json => {
                if (json.code === 1) {
                    dispatch({
                        type: types.DASHBOARD_ADD_NEW_EVENT,
                        data: json.data
                    });
                    dispatch(showMessage(constants.langs.saveSignInTypeTitleSucc,
                        'Event saved successfully', 'success'));
                } else {
                    dispatch(showMessage(constants.langs.generalErrorTitle,
                        json.message, 'error'));
                }
            }).catch(error => {
                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function loadEvents(accessToken) {
    return dispatch => {
        return fetch(`${configs.apiUrl}/get-events?access_token=${accessToken}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Fail to load events.');
            }).then(json => {
                if (json.code === 1) {
                    dispatch({
                        type: types.DASHBOARD_EVENTS_LOADED,
                        data: json.data
                    });
                }
            }).catch(error => {
                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function loadEventDetail(accessToken, eventId) {
    return dispatch => {
        if (!accessToken || !eventId) {
            return dispatch(showMessage(constants.langs.generalErrorTitle,
                'Invalid event detail load', 'error'));
        }

        return fetch(`${configs.apiUrl}/get-event?access_token=${accessToken}&eid=${eventId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Fail to load event detail.');
            }).then(json => {
                if (json.code === 1) {
                    dispatch({
                        type: types.DASHBOARD_EVENT_DETAIL_LOADED,
                        data: json.data
                    });
                }
            }).catch(error => {
                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function pubOnNewComment(data) {
    return {
        type: types.DASHBOARD_PUB_ON_NEW_COMMENT_ADDED,
        data
    }
}
export function pubOnUpdateComment(data) {
    return {
        type: types.DASHBOARD_PUB_ON_COMMENT_UPDATE,
        data
    }
}