import { ActionTypes } from '../constants/action-types'

const initialState = {
    users: []
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            const newData = { ...state, users: payload }
            state = newData;
            return state;
        default:
            return state;
    }
}