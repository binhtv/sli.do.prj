import * as types from './types';
import configs from '../commons/configs';
import { showMessage } from '../commons/helpers';
import constants from '../commons/constants';
// import { push } from 'react-router-redux'
export function addComment(data) {
    let postData = new FormData();
    postData.append('commentator', data.commentator);
    postData.append('comment', data.question);
    postData.append('eid', data.eid);
    return dispatch => {
        return fetch(`${configs.apiUrl}/new-comment`, {
            method: 'POST',
            body: postData,
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Internal Server Error.');
            }).then(json => {
                if (json.code == 1) {
                    dispatch(showMessage(constants.langs.saveSignInTypeTitleSucc,
                        'Comment added successfully', 'success'));
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

export function loadEventDetailAudience(eventId) {
    return dispatch => {
        if (!eventId) {
            return dispatch(showMessage(constants.langs.generalErrorTitle,
                'Invalid event detail load', 'error'));
        }

        return fetch(`${configs.apiUrl}/get-event-audience?eid=${eventId}`, {
            method: 'GET',
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
                        type: types.AUDIENCE_EVENT_DETAIL_LOADED,
                        data: json.data
                    });
                }
            }).catch(error => {
                dispatch(showMessage(constants.langs.generalErrorTitle,
                    constants.langs.generalErrorMessage + '(' + error.message + ')', 'error'));
            });
    }
}

export function updateComment(id, data) {
    if(!id || typeof data !== 'object' || !data) {
        return;
    }

    let postData = new FormData();
    postData.append('id', id);
    postData.append('data', JSON.stringify(data));
    return dispatch => {
        return fetch(`${configs.apiUrl}/update-comment`, {
            method: 'POST',
            body: postData,
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Internal Server Error.');
            }).then(json => {
                if (json.code == 1) {
                    dispatch(showMessage(constants.langs.saveSignInTypeTitleSucc,
                        'Comment updated successfully', 'success'));
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

export function pubOnNewCommentAudience(data) {
    return {
        type: types.AUDIENCE_PUB_ON_NEW_COMMENT_ADDED,
        data
    }
}

export function pubOnUpdateCommentAudience(data) {
    return {
        type: types.AUDIENCE_PUB_ON_COMMENT_UPDATE,
        data
    }
}