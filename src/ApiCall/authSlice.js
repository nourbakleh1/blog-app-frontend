import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { publicReq } from "../lib/publicReq";

export const loginUser=createAsyncThunk("auth/loginUser",async(data,ThunkApi)=>{

    try{
        const user=(await publicReq.post("/api/auth/login",data));
        // localStorage.setItem("userInfo",JSON.stringify(user.data));

        return user.data;
    }
    catch(error){
        toast.error(error.response.data.message);
    }
});

export const createUser=createAsyncThunk("auth/createUser",async(data,ThunkApi)=>{
    try{
       const user=await publicReq.post("/api/auth/register",data);
       return user.data.message;
    }
    catch(error){
        toast.error(error.response.data.message);
    }
});
// /api/auth/:userId/verify/:token
export const verifyToken=createAsyncThunk("auth/verifyToken",async({user_id,token},ThunkApi)=>{
    try{
       const verify=await publicReq.get(`/api/auth/${user_id}/verify/${token}`);
       return verify.data.message;
    }
    catch(error){
        toast.error(error.response.data.message);
    }
});
const initialState={isLoading:true,isError:false,error:null,users:null,isEmailVerified:false}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
            logout:(state)=>{
            //   localStorage.removeItem("userInfo");
                state.users=null
            },
            setUserName:(state,action)=>{
                state.users.username=action.payload
            },
            setUploadImage:(state,action)=>{
                state.users.profilePhoto=action.payload;
            }
    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(loginUser.pending,(state,action)=>{
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.users=action.payload;

            }).addCase(
                loginUser.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.error=action.payload;
                }
            )
            .addCase(createUser.fulfilled,(state,action)=>{
                console.log("inside fulf");
            })
            .addCase(verifyToken.fulfilled,(state,action)=>{
                state.isEmailVerified=true;
            })
        }
    
})


export const {setUploadImage,logout,setUserName}=authSlice.actions;
export default authSlice.reducer;