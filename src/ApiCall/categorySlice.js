import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicReq } from "../lib/publicReq";
import { toast } from "react-toastify";
import { privateReq } from "../lib/privateReq";



const initialState={
    Allcategory:null
}

export const  getAllCategory=createAsyncThunk("category/getAllCategory",async(_,thunkApi)=>{
    try{
        const controller=new AbortController();
        thunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const AllCategory=await publicReq.get("/api/categories",{
            signal:controller.signal
        });
        return AllCategory
    }
    catch(err){
        if(err.message == "canceled"){
            return false;
        }
        else{
            return toast.error(err.message)
        }
    }
});
export const createCategory=createAsyncThunk("category/createCategory",async(data,thunkApi)=>{
    try{
        const insertCat=await privateReq.post("/api/categories",data);
        return insertCat.data;
    }catch(err){
        console.log(err.message)
    }
});
export const deleteCategory=createAsyncThunk("category/deleteCategory",async(id,thunkApi)=>{
    try{
        const deleteCat=await privateReq.delete(`/api/categories/${id}`);
        return deleteCat.data;
    }catch(err){
        console.log(err.message);
    }
});
const categorySlice=createSlice({
    name:"category",
    initialState,
    
    extraReducers:
        (builder)=>{
            builder.addCase(getAllCategory.fulfilled,(state,action)=>{
                state.Allcategory=action.payload.data;
            })
            .addCase(createCategory.fulfilled,(state,action)=>{
                state.Allcategory?.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
              state.Allcategory= state.Allcategory?.filter((cat)=>{
                    return cat._id !== action.payload.categoryId;
                });
            })
        }
    
});

export default categorySlice.reducer;
