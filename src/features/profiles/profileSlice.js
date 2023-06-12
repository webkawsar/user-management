
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isProfileLoaded: false,
    userProfile: {},
    isContactsLoaded: false,
    userContacts: [],
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        userProfile: (state, action) => {
            state.isProfileLoaded = true;
            state.userProfile = action.payload;
        },
        userContacts: (state, action) => {
            state.isContactsLoaded = true;
            state.userContacts = action.payload.contacts;
        },
    }
})

export const { userProfile, userContacts } = profileSlice.actions;
export default profileSlice.reducer;