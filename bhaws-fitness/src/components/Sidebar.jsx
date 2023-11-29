import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar(){
    const navigate = useNavigate()

    function logout(){
        
        localStorage.removeItem('token')
        navigate('/login')

    }

    return(
        <div className="relative h-screen w-1/5 bg-slate-700 flex flex-col p-4 shadow-xl text-white">
            <a href="/" className=" font-bebas text-white align-middle text-center text-5xl m-2">
                Bhaws
            </a>
            <div onClick={logout} className="absolute bottom-4 text-white text-center m-2 cursor-pointer">
                Log Out
            </div>
        </div>
    )

}