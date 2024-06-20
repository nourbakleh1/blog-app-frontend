import React,{useState} from 'react';
import "./forms.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../ApiCall/authSlice';
import swal from 'sweetalert';
const Register = () => {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  
  const handellogin=(e)=>{

    e.preventDefault();
    const data={
      "username":name,
      "email": email,
      "password":password
    }
    console.log(data)
    dispatch(createUser(data)).unwrap().then((resolve)=>{
      if(resolve){
        swal({
          title:resolve,
          icon:"success"
        }).then((isOk=>{
          if(isOk){
            navigate("/login")
    
          }
        }))
     
      }
    });
  }
  // if(registerMessage){
  //   swal({
  //     title:registerMessage,
  //     icon:"success"
  //   }).then((isOk=>{
  //     if(isOk){
  //       navigate("/login")

  //     }
  //   }))
 
  // }
  return (
    <>
    <section className='flex justify-between items-center gap-1 bg-[#fff] '>
      
        <div className='picture max-h-[500px] hidden sm:block h-svh'></div>
        <div className=' w-full flex my-5 md:my-0 justify-center rounded-md'>
          <form onSubmit={handellogin} className=' flex flex-col max-w-[500] m-[10px] md:w-[500px] p-5 gap-2 shadow-[0px_0px_15px_5px_#0275d8]'>
              <label className='font-bold   text-black' htmlFor='name'>User name :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100 ' value={name} onChange={(e)=>setName(e.target.value)}type='text' placeholder='enter your name' id="name"/>
              <label className='font-bold   text-black' htmlFor='email'>Email :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100 ' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='enter your email' id="email"/>
              <label className='font-bold  text-black' htmlFor='password'>Passowrd :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100 ' value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='enter your Password' id="password"/>
             <button className='w-fit m-auto bg-blue_color hover:bg-blue-400 transition-all delay-150 mt-3 text-white p-2 rounded-md' type='submit'>Register</button>
             <p className='text-center text-gray-400'>if you have account <Link className='text-blue-300' to="/login">Log in</Link></p>
          </form>
        </div>
      
    </section>

    </>
  )
}

export default Register