import axios from "axios";
export const privateReq= axios.create(
        {
            baseURL:"http://localhost:8000",
            
        }
    
    )
    // Add a request interceptor
privateReq.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization="bearer " + JSON.parse(localStorage.getItem("userInfo")).token;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });