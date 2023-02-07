import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: [],
    reducers: {
        fetchRole(state, action) {
            return action.payload
        }
    }
})

export default roleSlice.reducer;
export const { fetchRole } = roleSlice.actions;