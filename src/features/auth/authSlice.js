import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
        },
        userLoggedOut: (state, action) => {
            state.user = {}
        }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;