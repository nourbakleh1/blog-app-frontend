import { useParams } from "react-router-dom";
import Post_list from "../../components/posts/Post_list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, getPostsCategory } from "../../ApiCall/postSlice";


const Category = () => {
  const dispatch=useDispatch();
  const {category}=useParams();
  const {postCategory}=useSelector((state)=>allPosts(state));

    useEffect(()=>{
     const promise= dispatch(getPostsCategory(category));
     
     return ()=>{
      promise.abort();

     }
    },[])

    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);
  return (
    
    <>
       {
        postCategory?.length == 0 ?<p className="p-5 text-cyan-600 font-extrabold my-[180px] capitalize text-[20px] text-center bg-slate-950"> post with  {category} category not found !!</p> : 
        <div><p className="p-5 text-cyan-600 font-extrabold my-3 capitalize text-[20px] text-center bg-slate-950">posts about {category}</p>
    <Post_list posts={postCategory}/>
    </div>
       } 
       </>
  )
}

export default Category