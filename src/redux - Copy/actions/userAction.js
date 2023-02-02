import { ActionTypes } from '../constants/action-types';

export const setUser1 = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}