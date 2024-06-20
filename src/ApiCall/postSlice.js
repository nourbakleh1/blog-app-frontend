import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { publicReq } from "../lib/publicReq";
import { toast } from "react-toastify";
import { privateReq } from "../lib/privateReq";




export const getAllpostsByAdmin=createAsyncThunk("posts/getAllpostsByAdmin",async(_,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const posts= await publicReq.get(`/api/posts`,{
            signal:controller.signal,
        });
        return posts;
    }
    catch(error){
        if(error.message === "canceled"){
            return false;
        }else{
            toast.error(error.message)
        }
    }
})
export const getAllposts=createAsyncThunk("posts/getAllposts",async(pageNumber,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const posts= await publicReq.get(`/api/posts?pageNumber=${pageNumber}`,{
            signal:controller.signal,
        });
        return posts.data;
    }
    catch(error){
        if(error.message === "canceled"){
            return false;
        }else{
            toast.error(error.message)
        }
    }
})
export const getPostCount=createAsyncThunk("posts/getPostCount",async(_,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const count= await publicReq.get("/api/posts/count",{
            signal:controller.signal
        });
        return count;
    }
    catch(error){
        if(error.message === "canceled"){
            return false;
        }else{
            toast.error(error.message)
        }
    }
});
export const getPostsCategory=createAsyncThunk("posts/getPostsCategory",async(category,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const postCat=await publicReq.get(`/api/posts?category=${category}`,{
            signal:controller.signal
        });
            
        return postCat;
    }
    catch(error){
        if(error.message === "canceled"){
            return false;
        }else{
            toast.error(error.message)
        }
    }
});
export const createPost=createAsyncThunk("posts/createPost",async(data,ThunkApi)=>{
    try{
        const insertNewPost=await privateReq.post("/api/posts",data,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        return insertNewPost.data;
    }
    catch(err)
    {
        console.log(err.message);
    }
});
export const getPostDitails=createAsyncThunk("posts/getPostDitails",async(id,ThunkApi)=>{
    try{
        const controller=new AbortController();
        ThunkApi.signal.addEventListener("abort",()=>{
            controller.abort();
        })
        const ditails=await publicReq.get(`/api/posts/${id}`,{
            signal:controller.signal
        });
        return ditails
    }
    catch(error){
        if(error.message === "canceled"){
            return false;
        }else{
            toast.error(error.message);
        }
    }
});
export const deletePost=createAsyncThunk("posts/deletePost",async(id,ThunkApi)=>{
    try{
        const {data}=await privateReq.delete(`/api/posts/${id}`);
        return {message:data.message,id}
    }
    catch(err){
        console.log(err.message)
    }
});

export const updatePost=createAsyncThunk("posts/updatePost",async({id,dataX},ThunkApi)=>{
    try{
        const {data}=await privateReq.put(`/api/posts/${id}`,dataX);
        return data;
    }
    catch(err){
        console.log(err.message);
    }
});

export const updateImagePost=createAsyncThunk("posts/updateImagePost",async({id,formData},ThunkApi)=>{
    try{
         const {data}=await privateReq.put(`/api/posts/update-image/${id}`,formData,{
            headers:{
                
                "Content-Type": "multipart/form-data"
            }
         });
         toast.success(data.message)
         
    }
    catch(err){
        console.log(err.message);
    }
});

export const toggleLike=createAsyncThunk("posts/toggleLike",async(id,ThunkApi)=>{
    try{
        
       const {data}= await privateReq.put(`/api/posts/like/${id}`,{} // we should put empty object in state put || post if you dont need to send any data
        );
        return data
    }
    catch
    (error){
        console.log(error.message);
    }
})


const initialState={posts:null,postCount:null,postCategory:null,isLoading:false,singlePost:null,controller_Cat:null}


const PostsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPushComment:(state,action)=>{
            state.singlePost.comments.push(action.payload);
        },
        setDeleteComment:(state,action)=>{
          state.singlePost.comments= state.singlePost.comments.filter((comment)=>{
                return comment._id != action.payload;
            });
        },
        setupdateComment:(state,action)=>{
            state.singlePost.comments = state.singlePost.comments.map((comment)=>{
                if(comment._id == action.payload._id){
                return    comment = action.payload
                }
                else{
                    return comment
                }  
            });
            
        }

    }
    ,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllposts.fulfilled,(state,action)=>{
            state.posts=action.payload
        })
        .addCase(getPostCount.fulfilled,(state,action)=>{
            state.postCount=action.payload.data.count;
        })
        .addCase(getPostsCategory.fulfilled,(state,action)=>{
            state.postCategory=action.payload.data;
            
        })
        .addCase(createPost.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.posts?.push(action.payload.data);
            state.isLoading=false;
        }).
        addCase(getPostDitails.fulfilled,(state,action)=>{
            state.singlePost=action.payload.data;
        }).addCase(updatePost.fulfilled,(state,action)=>{
            state.singlePost=action.payload;
        })
        .addCase(toggleLike.fulfilled,(state,action)=>{
            state.singlePost.likes = action.payload.likes
        })
        .addCase(getAllpostsByAdmin.fulfilled,(state,action)=>{
            state.posts=action.payload.data;
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.posts=state.posts?.filter((post)=>{
                return post._id !== action.payload.id
            })
        })
        
        
        
       
    }
});

export const allPosts=(state)=>{
    return state.post;
}
export const {setDeleteComment,setPushComment,setupdateComment}=PostsSlice.actions;
export default PostsSlice.reducer;