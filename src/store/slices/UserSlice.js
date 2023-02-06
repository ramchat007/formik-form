import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        newUser(state, action) {
            state.push(action.payload);
        },
        fetchUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            console.log(state);
            console.log(action);
            console.log(action.payload);
            state.splice(action.payload, 1)
            // return state
        }
    }
})

export default userSlice.reducer;
export const { newUser, fetchUser, removeUser } = userSlice.actions;