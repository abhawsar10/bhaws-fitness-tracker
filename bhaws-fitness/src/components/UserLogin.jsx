import React, { useState } from "react";

export default function UserLogin(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            window.location.href = '/dashboard'
        }else{
            alert("Please Check Login Information")
        }


    }


    return(
        <div className="">

            <div className="">

                <h1 className="text-3xl font-bold underline">
                    User Login Page
                </h1>

                <form onSubmit={loginUser}>
                    
                    <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email" 
                        placeholder="Email" 
                        required
                    /><br/>

                    <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password" 
                        placeholder="Password" 
                        required
                    /><br/>


                    <input type="submit" value="Login"/>
                </form>
            </div>

        </div>
    )

}