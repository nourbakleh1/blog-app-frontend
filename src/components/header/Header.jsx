import React, { useState } from 'react';
import Nav from './Nav';
import Rightheader from './Rightheader';
import Leftheader from './Leftheader';


const Header = () => {
    const[toggle,setToggle]=useState(true);
    
    

  return (
    <header className='bg-gray-100 shadow-[0px_0px_10px_10px_#778697]  flex justify-between container m-auto md:items-center relative'>
        <Leftheader toggle={toggle} setToggle={setToggle}/>
        <Nav setToggle={setToggle} toggle={toggle}/>
        <Rightheader/>
        
    </header>
  )
}

export default Header;