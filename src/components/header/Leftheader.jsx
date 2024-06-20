import React from 'react';

const Leftheader = ({toggle,setToggle}) => {
  return (
    <><div className='flex justify-between '>

    <div className='p-2 sm:p-5 bg-white text-blue_color'>
    <strong className='uppercase text-[15px] md:text-base'>blog</strong>
    <i className="bi bi-pencil text-[11px] " ></i>
    </div>
</div>
</>
  )
}

export default Leftheader