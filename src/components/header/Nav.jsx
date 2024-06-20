import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({setToggle,toggle}) => {

  const {user}=useSelector((state)=>{
    return state.auth});
  useEffect(()=>{
    if(window.scrollX >=500){
      console.log("yes its moving")
      setToggle(false)
    }
  },[])
  return (
    <>
    {toggle?
    <i  onClick={()=>setToggle((prev)=>{
    document.getElementById("nav").classList.remove("hidden");
    document.getElementById("nav").classList.add("flex"); 
    return !prev})} className="p-2 sm:p-5 bi bi-list md:hidden sm:text-3xl text-2xl"></i>
    :<i className="p-2 sm:p-5 bi bi-file-excel sm:text-3xl text-2xl md:hidden text-red-700" onClick={()=>setToggle((prev)=>{
    document.getElementById("nav").classList.add("hidden");
    return !prev})}></i>}



    <nav className='md:block md:top-[18%] md:right-[30%] absolute z-[1000]  top-[100%] right-[40%] md:bg-transparent bg-blue-100'>
    <ul className='md:flex  flex-col md:flex-row justify-center hidden' id="nav">

        <NavLink to="/" onClick={()=>setToggle((prev)=>{
         document.getElementById("nav").classList.add("hidden");
          return !prev})} className='p-[10px]  hover:bg-blue-300  hover:p-[12px] hover:text-white transition-all delay-[0.3s] rounded-[10px]'>
        <i className="bi bi-house"></i>Home
        </NavLink>


        <NavLink to="/posts" end onClick={()=>setToggle((prev)=>{
        document.getElementById("nav").classList.add("hidden");
          return !prev})} className='p-[10px]  hover:bg-blue-300  hover:p-[12px] hover:text-white transition-all delay-[0.3s] rounded-[10px]'>
        <i className="bi bi-collection"></i>Posts
        </NavLink>

          {user && <NavLink to="/posts/createPost" onClick={()=>setToggle((prev)=>{
            document.getElementById("nav").classList.add("hidden");
              return !prev})} className='p-[10px]  hover:bg-blue-300  hover:p-[12px] hover:text-white transition-all delay-[0.3s] rounded-[10px]'>
            <i className="bi bi-file-earmark-plus"></i>Create
            </NavLink>
          }
       

            {user?.isAdmin &&
              <NavLink to="admin-dashboard" onClick={()=>setToggle((prev)=>{
              document.getElementById("nav").classList.add("hidden");
              return !prev})} className='p-[10px]  hover:bg-blue-300  hover:p-[12px] hover:text-white transition-all delay-[0.3s] rounded-[10px]'>
              <i className="bi bi-person-fill-check"></i>Admin Dashbord
              </NavLink>
            }
        
        </ul>
        </nav></>
  )
}

export default Nav