import React, { useState } from "react";

export default function UserRegister(){

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
        console.log(data)


    }


    return(
        <div className="">

            <div className="">

                <h1 className="text-3xl font-bold underline">
                    User Registration Page
                </h1>

                <form onSubmit={registerUser}>
                    
                    <input 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text" 
                        placeholder="Name" 
                        required
                    /><br/>

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


                    <input type="submit" value="Register"/>
                </form>
            </div>

        </div>
    )

}