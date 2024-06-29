import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import {Provider}  from "react-redux";
import store, {persistor} from "./App/index.js";
import { PersistGate } from 'redux-persist/integration/react';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <App />
  </PersistGate>
  </Provider>
    
  </React.Fragment>,
)
