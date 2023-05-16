import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStore/userSlice";

const store = configureStore({
    reducer:{
        user:userSlice
    }
})

export default store;