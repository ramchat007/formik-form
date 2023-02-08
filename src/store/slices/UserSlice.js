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
        existingUser(state, action) {
            state = action.payload
            return state
        },
        removeUser(state, action) {
            state.splice(action.payload, 1)
            return state
            // return []
        }
    }
})

export default userSlice.reducer;
export const { newUser, fetchUser, existingUser, removeUser } = userSlice.actions;