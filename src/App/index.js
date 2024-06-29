import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postSlice from "../ApiCall/postSlice";

import authSlice from "../ApiCall/authSlice";
import userSlice from "../ApiCall/userSlice";
import categorySlice from "../ApiCall/categorySlice";
import CommentsSlice from "../ApiCall/CommentsSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";


  const userPersistConfig = {
    key: 'auth',
    storage,
    whitelist:['users']
  }

  const persistedAuthReducer=persistReducer(userPersistConfig,authSlice);


  const reducer=combineReducers({
        post:postSlice,
        auth:persistedAuthReducer,
        user:userSlice,
        category:categorySlice,
        comments:CommentsSlice
  });


 const store=configureStore({
    reducer:{
        reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
       })
});

export const persistor=persistStore(store);
export default store;