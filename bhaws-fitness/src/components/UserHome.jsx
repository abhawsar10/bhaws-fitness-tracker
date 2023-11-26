import React, { useEffect,useState } from "react";
// import { Jwt, decode } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";


export default function UserHome(){

    const navigate = useNavigate()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [quote, setQuote] = useState('')
    
    const [tempname, setTempname] = useState('')
    const [tempemail, setTempemail] = useState('')
    const [temppassword, setTemppassword] = useState('')
    const [tempquote, setTempquote] = useState('')


    async function populateDashboard(){
        const response = await fetch('http://localhost:6968/api/userinfo',{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data = await response.json()
        console.log(data)

        if(data.status==='ok'){
            setName(data.info.name)
            setEmail(data.info.email)
            setPassword(data.info.password)
            setQuote(data.info.quote)
        }else{
            console.log(data.error)
        }
    }

    async function updateInfo(event){

        event.preventDefault()
        const req = await fetch('http://localhost:6968/api/updateuserinfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body:JSON.stringify({
                quote: tempquote,
            })
        })

        const data = await req.json()
        console.log(data)

        if(data.status==='ok'){
            setTempquote('')
            setQuote(tempquote)
        }else{
            console.log(data.error)
        }
    }

    useEffect(()=>{

        const token = localStorage.getItem('token')

        if(token){
            const user = jwtDecode(token)

            if(!user){
                localStorage.removeItem('token')
            }else{
                populateDashboard()
            }
        }else{
            console.log("Login First")
            navigate('/login')
        }

    },[])

    return(
        <>
            <div className="p-4"> 
                Welcome {name}
                <br/>
                Your Email: {email}
                <br/>
                Your Password: {password}
                <br/>
                Your Quote: {quote}
                <br/>
            </div>
            
            <form onSubmit={updateInfo}>
{/*                     
                <input 
                    value={tempname}
                    onChange={(e)=>setTempname(e.target.value)}
                    type="text" 
                    placeholder="Update Name" 
                /><br/>

                <input 
                    value={tempemail}
                    onChange={(e)=>setTempemail(e.target.value)}
                    type="email" 
                    placeholder="Update Email" 
                /><br/>

                <input 
                    value={temppassword}
                    onChange={(e)=>setTemppassword(e.target.value)}
                    type="password" 
                    placeholder="Update Password" 
                /><br/> */}
                
                <input 
                    value={tempquote}
                    onChange={(e)=>setTempquote(e.target.value)}
                    type="text" 
                    placeholder="Update Quote" 
                /><br/>

                <input type="submit" value="Update Profile"/>
            </form>
        </>
    )

}