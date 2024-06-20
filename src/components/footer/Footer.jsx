import React from 'react';
import Leftheader from '../header/Leftheader';

const Footer = () => {
    const date= new Date();
  return (
    <footer className='flex flex-col justify-center items-center bg-black py-5 '>
                    <Leftheader/>
                    <p className='text-white mt-2'>Follow me <i className="bi bi-arrow-down-circle-fill"></i></p>
                    <div className='flex justify-center text-blue_color gap-5 mt-2'>

                    <i className="bi bi-facebook text-2xl hover:text-main_color"></i>
                    <i className="bi bi-whatsapp text-2xl hover:text-main_color"></i>
                    <i className="bi bi-github text-2xl hover:text-main_color"></i>
                    <i className="bi bi-twitter-x text-2xl hover:text-main_color"></i>
                    <i className="bi bi-threads-fill text-2xl hover:text-main_color"></i>
                    </div>
               <h2 className='text-center text-white my-3'> Created by <span className='text-red-500'>&lt;3</span> <span className='text-blue_color font-extrabold'>Nour aldeen bakleh</span> All Right reserved. &copy;<span className='text-blue_color font-extrabold' >{date.getFullYear()}</span></h2>
    </footer>
  )
}

export default Footer;