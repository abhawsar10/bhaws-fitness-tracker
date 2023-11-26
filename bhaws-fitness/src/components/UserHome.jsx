import React, { useEffect,useState } from "react";
// import { Jwt, decode } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";


export default function UserHome(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function populateDashboard(token){
        const response = await fetch('http://localhost:6968/api/userinfo',{
            headers:{
                'x-access-token': token,
            }
        })

        const data = await response.json()
        console.log(data)

        if(data.status==='ok'){
            setEmail(data.email)
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
                navigate.replace('/login')

            }else{
                
                populateDashboard(token)
            }

        }

    },[])

    return(
        <div>
            Welcome {email}
        </div>
    )

}