import { configureStore } from '@reduxjs/toolkit';
import roleSlice from './slices/RoleSlice';
import userSlice from './slices/UserSlice';

export const store = configureStore({
    reducer: { users: userSlice, role: roleSlice }
});