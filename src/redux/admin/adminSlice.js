import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token : null,
    curAdmin : null,
    loading : null,
    errors : null,
};

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        buttonStart : (state) => {
            state.loading=true;
        },

        buttonFinish : (state) => {
            state.loading=false;
            state.errors=false;
        },

        buttonFailed : (state, action) => {
            state.loading=false;
            state.errors=action.payload;
        },

        signInStart: (state) => {
            state.loading = true
        },

        //! data(response) yang ada pada sign in akan kita tambahkan ke reducers sebagai action
        signInSuccess: (state, action) => {
            state.token = action?.payload
            state.loading = false;
            state.errors = false;
        },
        
        signUpSuccess : (state) => {
            state.loading = false;
            state.errors = false;
        },

        getUserSuccess: (state, action) => {
            // * data state token nya akan di simpan di inisialisasikan ke state
            state.curAdmin = action?.payload
        },

        signInFailed: (state, action) => {
            state.loading = false,
            state.errors = action?.payload // errorny akan diambil dari data responsenya
        },

        updateUserStart: (state) => {
            state.loading;
        },

        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.errors = false;
            state.curAdmin = action?.payload;
        },

        updateUserFailed: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        }
    }
});

export const {buttonStart, buttonFinish, buttonFailed, signInStart, signInSuccess, signUpSuccess, getUserSuccess, signInFailed, updateUserStart, updateUserSuccess, updateUserFailed} = adminSlice.actions;

export default adminSlice.reducer;