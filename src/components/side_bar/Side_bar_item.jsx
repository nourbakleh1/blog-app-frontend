import React from 'react';
import {Link} from "react-router-dom";

const Side_bar_item = ({category}) => {
  
  return (
    <>
        <li  className='bg-blue-200 p-5 font-bold text-green_sea_color m-2 rounded-[10px]
         hover:bg-blue_color hover:text-white transition-all delay-100 cursor-pointer lisa'>
         <Link to={`/posts/categories/${category.title}`}>{category.title}</Link>
            
        </li>
    </>
  )
}

export default Side_bar_item;