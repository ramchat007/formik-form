import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: [],
    reducers: {
        newRole(state, action) {
            state.push(action.payload);
        },
        fetchRole(state, action) {
            return action.payload
        },
        existingRole(state, action) {
            state.splice(action.payload.id, 1)
            state.push(action.payload.data);
            return state
        },
        removeRole(state, action) {
            state.splice(action.payload, 1)
            return state
            // return []
        }
    }
})

export default roleSlice.reducer;
export const { newRole, fetchRole, existingRole, removeRole } = roleSlice.actions;