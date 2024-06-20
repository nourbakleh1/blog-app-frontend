import { useState } from "react";

const ForgotPasswprd = () => {
  const [email,setEmail]=useState("");


  const handelForget=(e)=>{

    e.preventDefault();
    const data={
      "email": email    }
    }
  return (
    <section className='flex justify-between items-center gap-1 bg-[#fff] '>
      
        <div className='picture max-h-[500px] hidden sm:block h-svh'></div>
        <div className=' w-full flex my-5 md:my-0 justify-center rounded-md'>
          <form onSubmit={handelForget} className=' flex flex-col max-w-[500] m-[10px] md:w-[500px] p-5 gap-2 shadow-[0px_0px_15px_5px_#0275d8]'>
              <label className='font-bold   text-black' htmlFor='email'>Email :</label>
              <input className='bg-slate-100 border-8 border-x-blue-100' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='enter your email' id="email"/>
             
             <button className='w-fit m-auto bg-blue_color hover:bg-blue-400 transition-all delay-150 mt-3 text-white p-2 rounded-md' type='submit'>Submit</button>

          </form>
        </div>
      
    </section>
  )
}

export default ForgotPasswprd



