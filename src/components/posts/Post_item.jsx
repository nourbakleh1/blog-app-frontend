import React from 'react';
import { Link } from 'react-router-dom';

const Post_item = ({post}) => {
  return (
    <><div className='mb-5 p-5 bg-white'>
    <div className='w-full '>
      <img src={post?.image?.url} alt='image post' className=' max-w-full md:w-full scale-90 object-contain max-h-[350px] 
       lg:h-[350px] hover:scale-100 hover:rounded-lg hover:shadow-[0px_0px_5px_5px_#ff5] transition-all delay-300'/>
    </div>
    
    
    <div className='p-3 flex justify-between items-center'>

    <h3><span className='text-green_color font-bold'>Author: </span>
     <Link to={`/posts/profile/${post?.user?._id}`} >{post?.user?.username}</Link></h3>

    <span className='bg-slate-300'>{new Date(post?.createdAt).toDateString() }</span>
    </div><hr/>
    <div className='p-3 flex justify-between items-center'>
    <h3 className='font-extrabold'>{post?.title}</h3>

    <Link to={`/posts/categories/${post?.category}`} className=' bg-red-400 text-white_color rounded-[10px] p-1'>{post?.category}</Link>
    </div>
    <div className='p-3'>

    <span className='text-blue-400'>
      Discription: 
      
    </span>
    <p >{post?.description} lorem ipsum ise, lort molian popres harry
      lorem ipsum ios,salluer kalio nioop billla,
      lor tebbi noutrr,lorem ipsum ise, lort molian popres harry
      lorem ipsum ios,salluer kalio nioop billla,
     
      lor tebbi noutrr</p>
      <Link to={`/posts/details/${post?._id}`} className='text-green_sea_color underline '>Read More...</Link>
      <hr className='my-2'/>
    



    </div>
   

    </div></>
  )
}

export default Post_item;