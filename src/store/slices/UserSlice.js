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
        removeUser(state, action) { }
    }
})

export default userSlice.reducer;
export const { newUser } = userSlice.actions
export const { fetchUser } = userSlice.actions
export const { removeUser } = userSlice.actions