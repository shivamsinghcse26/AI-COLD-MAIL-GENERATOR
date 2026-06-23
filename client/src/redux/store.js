import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./authSlice";
import aiSlice from "./aiSlice"





export const store= configureStore({
    reducer:{
        auth:authReducer,
        ai:aiSlice
    }
})