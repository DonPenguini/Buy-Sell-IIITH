import React from "react";
import { assets } from '../assets/assets'
import { useNavigate } from "react-router";

const Navbar1 = () => {

    const navigate = useNavigate();
    return (
        <div className ='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0' >
            <img src={assets.logo} alt="logo" className='w-28 sm:w-32'/>
            <div className="flex gap-4 ml-auto">
                <button  onClick={() => navigate('/signin')} 
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-400 transistion-all'>Log In</button>
                <button onClick={() => navigate('/signup')}
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-400 transistion-all'>Sign Up</button>
                <button onClick={() => navigate('/dash')}
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-400 transistion-all'>DashBoard</button>
                </div>
        </div>
    )
};

export default Navbar1;


