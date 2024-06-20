import React, { useState } from 'react';
import "./forms.css";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../ApiCall/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch=useDispatch();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();


  const handellogin=(e)=>{
    e.preventDefault();
    const data={
      "email": email,
      "password":password
    }
    
    dispatch(loginUser(data));
    

  }
  return (
    <>
    <section className='flex justify-between items-center gap-1 bg-[#fff] '>
      
        <div className='picture max-h-[500px] hidden sm:block h-svh'></div>
        <div className=' w-full flex my-5 md:my-0 justify-center rounded-md'>
          <form onSubmit={handellogin} className=' flex flex-col max-w-[500] m-[10px] md:w-[500px] p-5 gap-2 shadow-[0px_0px_15px_5px_#0275d8]'>
              <label className='font-bold   text-black' htmlFor='email'>Email :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100 ' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='enter your email' id="email"/>
              <label className='font-bold  text-black' htmlFor='password'>Passowrd :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100 ' value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='enter your Password' id="password"/>
             <button className='w-fit m-auto bg-blue_color hover:bg-blue-400 transition-all delay-150 mt-3 text-white p-2 rounded-md' type='submit'>Login</button>
             <p className='text-center text-gray-400'>Did you forgot your password? <Link className='text-green-300' to="/forgot-password">Forgot password</Link></p>

          </form>
        </div>
      
    </section>

    </>
  )
}

export default Login