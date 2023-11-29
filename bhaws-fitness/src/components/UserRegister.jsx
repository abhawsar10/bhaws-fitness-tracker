import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Titlebar from "./Titlebar";

export default function UserRegister(){

    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event){

        event.preventDefault()

        const response  = await fetch('http://localhost:6968/api/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        if(data.status=='ok'){
            navigate('/login')
        }

        console.log(data)

    }


    return(
        <>
            {/* <Titlebar/> */}
            <div className="h-screen w-full pt-14  bg-zinc-900 text-white flex flex-col items-center justify-center">

                <div className="flex flex-col items-center py-20 bg-slate-700 w-1/3 h-4/5 rounded-md drop-shadow-md ">

                    <a href="/" className="font-bebas text-white align-middle text-5xl mb-10 px-10">
                        Bhaws Fitness Tracker
                    </a>

                    <h1 className="text-4xl font-bungee m-4">
                        Register
                    </h1>

                    <form onSubmit={registerUser} className="w-11/12 text-center">
                        
                        <input 
                            className="m-4 bg-slate-700 border-2 rounded-sm p-2 w-8/12 text-xl"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            type="text" 
                            placeholder="Name" 
                            required
                        /><br/>

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
                            type="submit" value="Register"
                        />

                        <div>
                            Already a User? Login <a href="/login" className="underline">Here</a>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )

}