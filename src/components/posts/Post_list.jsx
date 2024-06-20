import React from 'react';
import Post_item from './Post_item';

const Post_list = ({posts}) => {
  return (
    <>

   
    <div className='flex-[9] '>
     
            {posts?.map((post,idx)=>{
                return <Post_item post={post} key={idx}/>
            })}

             </div>
    
    </>
  )
}

export default Post_list;