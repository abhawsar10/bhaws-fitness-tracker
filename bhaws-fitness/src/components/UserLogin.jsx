import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function UserLogin(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{

        const token = localStorage.getItem('token')

        if(token){
            const user = jwtDecode(token)

            if(!user){
                localStorage.removeItem('token')
            }else{
                navigate('/home')
            }
        }

    },[])

    async function loginUser(event){

        event.preventDefault()

        const response  = await fetch('http://localhost:6968/api/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()
        if (data.user){
            alert("Login Successful")
            localStorage.setItem('token',data.user)
            window.location.href = '/home'
        }else{
            alert("Please Check Login Information")
        }


    }


    return(
        <>
            {/* <Titlebar/> */}
            <div className="h-screen w-full pt-14 bg-zinc-900 text-white flex flex-col items-center justify-center">

                <div className="flex flex-col items-center py-20 bg-slate-700 w-1/3 h-4/5 rounded-md drop-shadow-md ">

                    <a href="/" className="font-bebas text-white align-middle text-5xl mb-10 px-10">
                        Bhaws Fitness Tracker
                    </a>

                    <h1 className="text-4xl font-bungee m-4">
                        Log In
                    </h1>

                    <form onSubmit={loginUser} className="w-full text-center">
                        
                        <input 
                            className="m-4 bg-slate-700 border-2 rounded-sm p-2 w-8/12 text-xl"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email" 
                            placeholder="Email" 
                            required
                        /><br/>

                        <input 
                            className="m-4 bg-slate-700 border-2 rounded-sm p-2 w-8/12 text-xl"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password" 
                            placeholder="Password" 
                            required
                        /><br/>


                        <input 
                            className="m-4 text-xl text-center rounded-md py-2 px-10 bg-gradient-to-r from-amber-400 to-purple-600 drop-shadow-md cursor-pointer select-none" 
                            type="submit" value="Log In"
                        />
                        
                        <div>
                            New to BHAWS? Register <a href="/register" className="underline">Here</a>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )

}