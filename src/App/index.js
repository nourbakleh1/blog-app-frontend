import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../ApiCall/authSlice";
import userSlice from "../ApiCall/userSlice";
import postSlice from "../ApiCall/postSlice";
import categorySlice from "../ApiCall/categorySlice";
import CommentsSlice from "../ApiCall/CommentsSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        post:postSlice,
        category:categorySlice,
        comments:CommentsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
       })
});


export default store;