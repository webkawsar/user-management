import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedOut: (state, action) => {
            state.token = null
            state.user = null
        }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;