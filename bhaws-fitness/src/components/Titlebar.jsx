import React from "react";
import { useNavigate } from "react-router-dom";

export default function Titlebar(){
    const navigate = useNavigate()

    function gotohome(){
        navigate('/')
    }

    return(
        <div 
            className="absolute h-14 w-screen bg-slate-700 flex items-center justify-center font-bebas text-white text-3xl"
        >   
            <a href="/">
                Bhaws
            </a>
        </div>

    )
}