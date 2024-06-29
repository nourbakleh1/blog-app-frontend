import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicReq } from "../lib/publicReq";
import { setDeleteComment, setPushComment, setupdateComment } from "./postSlice";
import axios from "axios";
import { privateReq } from "../lib/privateReq";


export const createComments=createAsyncThunk("comments/createComments",async(data,ThunkApi)=>{
    try{
            const insert=await privateReq.post("/api/comments",data);
            ThunkApi.dispatch(setPushComment(insert.data));
            return insert.data;
    }
    catch(err){
        console.log(err.message);
    }
});

export const DeleteComment=createAsyncThunk("comments/DeleteComment",async(id,ThunkApi)=>{
    try{
        const delete_Comment=await privateReq.delete(`/api/comments/${id}`);
        ThunkApi.dispatch(setDeleteComment(id));
        return delete_Comment.data;
    }catch(err){
        console.log(err.message)
    }
});
export const DeleteCommentAdmin=createAsyncThunk("comments/DeleteCommentAdmin",async(id,ThunkApi)=>{
    try{
        const delete_Comment=await privateReq.delete(`/api/comments/${id}`);
        
        return  id;
    }catch(err){
        console.log(err.message)
    }
});
export const updateComments=createAsyncThunk("comments/updateComments",async({id,text},ThunkApi)=>{
    try{
        const update_Comment=await privateReq.put(`/api/comments/${id}`,text);
        ThunkApi.dispatch(setupdateComment(update_Comment.data));
        return update_Comment.data;
    }
    catch
    (error){
        console.log(error.message);
    }
});
export const getAllComments=createAsyncThunk("comments/getAllComments",async(_,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const Allcomments=await privateReq.get("/api/comments",{
            
            signal:controller.signal
        });
        return Allcomments
    }catch(err){
        console.log(err.message)
    }
})


const initialState={comments:null};


const commentsSlice=createSlice({
    name:"comments",
    initialState,
    reducers:{

    },
    extraReducers:
    (builder)=>{
      builder.addCase(getAllComments.fulfilled,(state,action)=>{
        state.comments=action.payload.data
      }).addCase(DeleteCommentAdmin.fulfilled,(state,action)=>{
        state.comments= state.comments?.filter((comment)=>{
            return comment._id != action.payload
        });
      })
    }
});


export default  commentsSlice.reducer;