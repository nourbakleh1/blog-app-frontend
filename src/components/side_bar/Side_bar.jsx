import React from 'react';
import Side_bar_item from './Side_bar_item';

const Side_bar = ({categories}) => {
  return (
    <><ul className='flex-[3] bg-white'>
    <h2 className='text-center font-extrabold text-fuchsia-300'>Categories</h2>
          {categories?.map((el)=>{
            return <Side_bar_item category={el} key={el._id}/>
          })}
    </ul></>
  )
}

export default Side_bar;