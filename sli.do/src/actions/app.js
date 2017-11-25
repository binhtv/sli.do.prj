import fetch from 'isomorphic-fetch';
import configs from '../commons/configs';
import * as types from './types';
import { showMessage } from '../commons/helpers';
import constants from '../commons/constants';
import { push } from 'react-router-redux';

export function loadUserInfo(accessToken) {
    return dispatch => {
        return fetch(`https://${configs.auth.domain}/userinfo`, {
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
                throw new Error('Internal Server Error.');
            }).then(json => {
                dispatch({
                    type: types.APP_USER_LOADED,
                    data: json
                });
            }).catch(error => {
                dispatch({
                    type: types.APP_USER_LOADED,
                    data: {}
                });

                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function searchEventByCode(code) {
    return dispatch => {
        return fetch(`${configs.apiUrl}/get-events-by-code?ecode=${code}`, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Internal Server Error.');
            }).then(json => {
                if (json.code === 1) {
                    if (json.data && json.data.length > 0) {
                        dispatch({
                            type: types.APP_EVENT_BY_CODE_SEARCHED,
                            data: json.data
                        });
                    } else {
                        dispatch(showMessage('Information',
                            'Sorry no events found', 'info'));
                    }
                } else {
                    dispatch(showMessage(constants.langs.generalErrorTitle,
                        `Fail to search events (${json.message})`, 'error'));
                }
            }).catch(error => {
                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function gotoPage(url) {
    return dispatch => {
        dispatch(push(url));
    }
}

export function showChat(message) {
    return dispatch => {
        dispatch(showMessage('new chat', message, 'success'));
    }
}