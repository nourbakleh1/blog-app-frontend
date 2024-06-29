import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicReq } from "../lib/publicReq";
import { setUploadImage, setUserName } from "./authSlice";
import axios from "axios";
import { privateReq } from "../lib/privateReq";



export const getAllUSERS=createAsyncThunk("users/getAllUsers",async(_,thunkApi)=>{
    try{
        const controller=new AbortController();
        thunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const AllUsers=await privateReq.get("/api/users/profile",{
            
            signal:controller.signal
        });
        return AllUsers
    }
    catch(err){
        console.log(err.message)
    }
})
export const getUserData=createAsyncThunk("user/getUserData",async(id,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const user=await publicReq.get(`/api/users/profile/${id}`,{
            signal:controller.signal
        });
        return user;
    }catch(error){
        return user.data.message
    }
});
export const updateUserData=createAsyncThunk("user/updateUserData",async({id,updatedUser},thunkApi)=>{
    const {getState,dispatch}=thunkApi;

    try{
        const result= await privateReq.put(`/api/users/profile/${id}`,updatedUser);
        
        dispatch(setUserName(updatedUser.username));
        return result.data

        
    }
    catch(err)
    {
        console.log(err.message)
    }
});

export const UpdateProfileImage=createAsyncThunk("user/UpdateProfileImage",async(img,thunkApi)=>{
    try{
        const photo=await privateReq.post("/api/users/profile/profile-photo-upload",img,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        

        thunkApi.dispatch(setUploadImage(photo.data.profilePhoto));
        return photo.data
    }
    catch(err){
        console.log(err.message)
    }
});
export const deleteUserProfile=createAsyncThunk("user/deleteUserProfile",async(id,thunkApi)=>{
    try{
        
        const Delete_user=await privateReq.delete(`/api/users/profile/${id}`);
        return id;
    }
    catch
    (err){
        console.log(err.message);
    }
});

const initialState={user:null,isLoading:true,isError:false,error:null,AllUsers:null};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserData.pending,(state,action)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=action.payload.data;
            state.isError=false;

        })
        .addCase(getUserData.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
            state.isError=false;
        })
        .addCase(updateUserData.fulfilled,(state,action)=>{
            state.user=action.payload;

        })
        .addCase(UpdateProfileImage.fulfilled,(state,action)=>{
            state.user.profilePhoto=action.payload.profilePhoto;
        })
        .addCase(getAllUSERS.fulfilled,(state,action)=>{
            state.AllUsers=action.payload?.data;
        })
        .addCase(deleteUserProfile.fulfilled,(state,action)=>{
            state.AllUsers=state.AllUsers?.filter((user)=>{
                return user._id !== action.payload
            });
        })
    }

});


export default userSlice.reducer;