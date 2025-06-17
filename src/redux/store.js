import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice"
import postSlice from "../redux/postSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
    }
}) 