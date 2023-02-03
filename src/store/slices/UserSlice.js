import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        newUser(state, action) {
            // console.log(state);
            // console.log(action);
            // console.log(action.payload);
            state.push(action.payload);
        },
        fetchUser(state, action) {
            // console.log(state);
            // console.log(action);
            // console.log(action.payload);
            return action.payload
        },
        removeUser(state, action) { }
    }
})

export default userSlice.reducer;
export const { newUser } = userSlice.actions
export const { fetchUser } = userSlice.actions
export const { removeUser } = userSlice.actions