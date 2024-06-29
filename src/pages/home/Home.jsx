import React, { useEffect, useState } from 'react';
import "./Home.css";

import {categories} from "../../dummyData.js";
import Post_list from '../../components/posts/Post_list';
import Side_bar from '../../components/side_bar/Side_bar.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../../ApiCall/postSlice.js';
import { getAllCategory } from '../../ApiCall/categorySlice.js';

const Home = () => {
  const {posts}=useSelector((state)=>state.reducer.post);
  const {Allcategory}=useSelector((state)=>{return state.reducer.category});


  const dispatch=useDispatch();
  
    useEffect(()=>{
      const promise1=dispatch(getAllposts(1));
      const promise2=dispatch(getAllCategory());
      return ()=>{
        promise1.abort();
        promise2.abort();
      }
    },[]);
   
  
  return (
    <section>
      <div className='Hero-image flex justify-center items-center z-[-10]'>
        <h1 className='title relative  text-lg md:text-3xl text-white bg-slate-600 rounded-[18px_0px_18px_0px] p-2'>Welcome to blog</h1>
      </div>
      <div className='header'>
       <h2>latest post</h2>
      </div>
      <div className='flex justify-between  gap-3 flex-wrap md:flex-nowrap'>
        <Post_list posts={posts}/>
        
        <Side_bar categories={Allcategory}/>
      </div>
      <div className='w-fit text-blue_color p-1 rounded-[10px] m-auto mb-3  bg-white'>
        <Link to="/posts" className='font-bold'>See all posts</Link>
      </div>
      

    </section>
  )
}

export default Home;