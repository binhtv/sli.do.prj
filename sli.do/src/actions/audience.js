import * as types from './types';
// import { push } from 'react-router-redux'
export function addComment(data) {
    return {
        type: types.AUDIENCE_ADD_COMMENT,
        data
    }
}