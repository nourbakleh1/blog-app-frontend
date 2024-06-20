import React, { useEffect, useState } from 'react';
import { categories } from '../../dummyData';
import Post_list from '../../components/posts/Post_list';
import Side_bar from '../../components/side_bar/Side_bar';
import Pagination from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts, getAllposts, getPostCount } from '../../ApiCall/postSlice';
import { getAllCategory } from '../../ApiCall/categorySlice';


  
  
const postsPage = () => {
  const POST_PER_PAGE=3;
  const {posts,postCount}=useSelector((state)=>allPosts(state));
  const {Allcategory}=useSelector((state)=>{return state.category});

  const [current,setCurrent]=useState(1);
  const pages = Math.ceil(postCount/POST_PER_PAGE);
  const dispatch=useDispatch();
  useEffect(()=>{
    const promise=dispatch(getAllposts(current));
    window.scrollTo(0,0);

    return ()=>{
      promise.abort()
    }
  },[current]);
  useEffect(()=>{
    const promise1=dispatch(getPostCount());
    const promise2=dispatch(getAllCategory());

    return ()=>{
      promise1.abort();
      promise2.abort();
    }

  },[]);
  return (
    <>
      <div className='flex justify-between  mt-[50px] gap-3 flex-wrap md:flex-nowrap'>
        <Post_list posts={posts}/>
        
        <Side_bar categories={Allcategory}/>
      </div>
      <Pagination current={current} setCurrent={setCurrent}  pages={pages}/>
    </>
  )
}

export default postsPage