import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {  createPost } from '../../ApiCall/postSlice';
import { useNavigate } from 'react-router-dom';
import { Audio, MutatingDots, ThreeCircles } from 'react-loader-spinner';
import { getAllCategory } from '../../ApiCall/categorySlice';

const CreatePost = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [description,setDescription]=useState("");
  const [image,setImage]=useState(null);
  const {Allcategory}=useSelector((state)=>{return state.reducer.category});

  const formdata= new FormData();
  formdata.append("title",title);
  formdata.append("category",category);
  formdata.append("description",description);
  formdata.append("image",image);
  const {isLoading}=useSelector((state)=>state.reducer.post);
  useEffect(()=>{
    const promise=dispatch(getAllCategory());

    return ()=>{
      promise.abort();
    }
  },[]);
  const handelingSub=(e)=>{
    e.preventDefault();
    if(title.trim() == ""){
     return toast.error("title is required")
    }
    if(category.trim() == ""){
      return toast.error("category is required")
     }
     if(description.trim() == ""){
      return toast.error("description is required")
     }
     if(!image){
      return toast.error("image is required")
     }
     const data={title,category,image,description};
    dispatch(createPost(data)).unwrap().then((resolve=>{
      if(resolve){
        swal({
          title: resolve?.title,
          
          icon: "success",
        }).then((isOk)=>{
          navigate("/posts");
        });
        setTitle(""),
        setCategory("");
        setDescription("");
        setImage(null);
      }
      
    }));
  }
  const loader=<MutatingDots
  visible={true}
  height="80"
  width="90"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />;
  return (
    <section >
    <h2 className='text-center border-2 bg-white_color font-bold text-green_color text-xl border-b-violet-800 my-3'>Create new Post</h2>

    <form onSubmit={handelingSub} className='bg-gray-300 my-[40px] rounded-lg max-w-[600px] md:w-[600px] mx-[5px]  md:mx-auto '>

    <label htmlFor='title' className='w-fit text-blue_color p-1 block'>Title</label>
      <input className='w-full p-2' type="text" placeholder='enter title post ' name="title" id='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>


    <label  className='w-fit text-blue_color p-1 block'>Category</label>
      <select className='w-full p-2' value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option className='bg-gray-200' disabled value="" >choose category</option>
        {Allcategory?.map((el)=>{
          return <option key={el._id} value={el.title}>{el.title}</option>
        })}
      </select>

    <label htmlFor='description' className='w-fit text-blue_color p-1 block'>Description</label>
     <textarea className='w-full p-2 resize-none' id='description' placeholder='enter description post' name='description'value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

    <label className='w-fit text-blue_color p-1 block'>image</label>
    <input className='w-full p-2 bg-white' type="file" placeholder='enter image post ' name="image"  onChange={(e)=>setImage(e.target.files[0])}/>
    {isLoading ?<div className='flex justify-center items-center'>{loader}</div>  :<input className='w-full p-2 text-white cursor-pointer bg-[#16a085] rounded-[0_0_10px_10px]' type="submit"  name="submit" />
    }

    
    </form>
    </section>
  )
}

export default CreatePost;