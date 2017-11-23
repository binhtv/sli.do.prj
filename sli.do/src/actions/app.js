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
                throw new Error('The response is not well formed json.');
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