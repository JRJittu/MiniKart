import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
};

/*
    State: is the current state of slice, here it is object with data userInfo
    action : it is the object passed to the reducer
        It has to proerties
        1. type: type of action being performed 
        2. payload: Data passed to this action 
*/

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
            localStorage.setItem('expirationTime', expirationTime.toString());
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('expirationTime');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
