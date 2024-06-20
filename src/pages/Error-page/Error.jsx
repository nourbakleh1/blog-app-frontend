import { Link, useNavigate } from "react-router-dom";
import   "./Error.css"
import { useEffect } from "react";


const Error = () => {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col justify-center items-center m-auto h-[500px]">
        <p> page not found !!!!</p>
        <span className="font-bold text-[40px] text-red-700">404</span>
        <Link onClick={()=>navigate(-1)} className="bg-blue-200 text-black">back</Link>
    </div>
  )
}

export default Error