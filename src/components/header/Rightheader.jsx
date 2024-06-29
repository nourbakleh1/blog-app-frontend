import React, { useState } from 'react';
import { NavLink ,Link, useNavigate} from 'react-router-dom';
// import { getUserData } from '../../ApiCall/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./header.css";
import { logout } from '../../ApiCall/authSlice';

const Rightheader = () => {
  const dispatch=useDispatch();
  const [dropdown,setDropdown]=useState(false);
  const navigate=useNavigate();
  const {users}=useSelector((state)=>{
    return state.reducer.auth});

  const HandelLogout=()=>{
    setDropdown(false);
    dispatch(logout());
    navigate("/");
  }
  return (
    
    <><div className='flex justify-between bg-white' >
    {users ?
      (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
              {users?.username}
            </span>
            <img
              src={users?.profilePhoto?.url}
              alt="user photo"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`posts/profile/${users?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={HandelLogout} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span >Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ):

     (<><div className='flex justify-evenly items-center  m-2 rounded-[10px]  bg-secondary_color text-main_color border-4 border-x-blue-400 border-y-blue-600'>
                <i className='text-blue-500 bi bi-box-arrow-in-right m-1 hidden sm:block'></i>
                <NavLink to="/login" className='text-[11px] md:text-base'>Login</NavLink>
            </div>
            <div className='flex justify-evenly items-center  m-2 rounded-[10px]  bg-secondary_color text-main_color border-4  border-x-green-400 border-y-green-600'>
                <i className='text-green-500 bi bi-person-plus m-1 hidden sm:block'></i>
                <NavLink to="/register" className='text-[11px] md:text-base'>Register</NavLink>
            </div></>)}
            
        </div></>
  )
}

export default Rightheader