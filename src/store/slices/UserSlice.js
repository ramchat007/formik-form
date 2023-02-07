import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        newUser(state, action) {
            state.push(action.payload);
        },
        fetchUser(state, action) {
            // console.log(state);
            // console.log(action);
            // console.log(action.payload);
            // return state
            return action.payload
        },
        existingUser(state, action) {
            // console.log(state);
            // console.log(action);
            // console.log(action.payload.id);
            // console.log(action.payload.data);
            state.splice(action.payload.id, 1)
            state.push(action.payload.data);
            return state
        },
        removeUser(state, action) {
            // console.log(state);
            // console.log(action);
            // console.log(action.payload);
            state.splice(action.payload, 1)
            return state
            // return []
        }
    }
})

export default userSlice.reducer;
export const { newUser, fetchUser, existingUser, removeUser } = userSlice.actions;