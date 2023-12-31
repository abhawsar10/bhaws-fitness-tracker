import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landingpage(){

    let navigate = useNavigate()

    function gotoRegister(){
        navigate('/register')
    }
    function gotoLogin(){
        navigate('/login')
    }

    return(
        <div className="h-screen w-full bg-zinc-900 text-white flex flex-col items-center justify-center">

                <div className="mb-20 font-bebas text-8xl drop-shadow-md">Bhaws Fitness Tracker</div>

                <div className="">
                    {/* <div className="text-xl py-3 px-10 rounded-xl text-white font-bungee text-center
                        bg-gradient-to-r from-amber-400 to-purple-600 drop-shadow-md cursor-pointer select-none"
                        onClick={gotoRegister}
                    >
                            Register
                    </div> */}
                    <div className="text-xl py-3 px-10 mt-4 rounded-xl text-white font-bungee text-center
                        bg-gradient-to-r from-amber-400 to-purple-600 drop-shadow-md cursor-pointer select-none"
                        onClick={gotoLogin}
                    >
                            Login
                    </div>
                </div>

        </div>
    )
}