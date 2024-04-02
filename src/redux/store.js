/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { version } from "react";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";


// const rootReducer = combineReducers({

// });

// const persistConfig = {
//     key: 'login',
//     version: 1,
//     storage
// }

// const persist = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : {},
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor  = persistStore(store);