import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    active : false,
    userData : null
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.active = true;
            state.userData = action.payload;
        },
        logout : (state) => {
            state.active = false;
            state.userData = null;
        }
    }
})


export default authSlice.reducer

export const {login, logout} =  reducers.action