import React, { useEffect,useState } from "react";
// import { Jwt, decode } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";


export default function UserHome(){

    const navigate = useNavigate()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmi, setBmi] = useState('')
    
    const [tempAge, setTempAge] = useState('')
    const [tempWeight, setTempWeight] = useState('')
    const [tempHeight, setTempHeight] = useState('')
    const [tempBmi, setTempBmi] = useState('')



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
            setAge(data.info.userDetails.age)
            setWeight(data.info.userDetails.weight)
            setHeight(data.info.userDetails.height)
            setBmi(data.info.userDetails.BMI)
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
                ...(tempAge && { age: tempAge }),
                ...(tempHeight && { height: tempHeight }),
                ...(tempWeight && { weight: tempWeight }),
            })
        })

        const data = await req.json()
        console.log(data)

        if(data.status==='ok'){
            setTempAge('')
            setTempHeight('')
            setTempWeight('')
            populateDashboard()
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
                Your Age: {age}
                <br/>
                Your Weight: {weight}
                <br/>
                Your Height: {height}
                <br/>
                Your BMI: {bmi}
                <br/>
            </div>
            
            <form onSubmit={updateInfo}>
                
                
                <input 
                    value={tempAge}
                    onChange={(e)=>setTempAge(e.target.value)}
                    type="Number" 
                    placeholder="Update Age" 
                /><br/>

                <input 
                    value={tempHeight}
                    onChange={(e)=>setTempHeight(e.target.value)}
                    type="Number" 
                    placeholder="Update Height" 
                /><br/>

                <input 
                    value={tempWeight}
                    onChange={(e)=>setTempWeight(e.target.value)}
                    type="Number" 
                    placeholder="Update Weight" 
                /><br/>


                <input type="submit" value="Update Profile"/>
            </form>
        </>
    )

}