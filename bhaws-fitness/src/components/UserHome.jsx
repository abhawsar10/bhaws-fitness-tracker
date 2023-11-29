import React, { useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserMertric from "./UserMetric";


export default function UserHome(){

    const navigate = useNavigate()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [tempAge, setTempAge] = useState('')
    const [tempWeight, setTempWeight] = useState('')
    const [tempHeight, setTempHeight] = useState('')
    
    const [metrics, setMetrics] = useState({})



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

            setMetrics({
                'age':data.info.userDetails.age,
                'weight':data.info.userDetails.weight,
                'height':data.info.userDetails.height,
                'bmi':data.info.userDetails.BMI,
            })

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
                
                console.log(metrics)
            }
        }else{
            console.log("Login First")
            navigate('/login')
        }

    },[])

    return(
        <>
            <div className="h-full w-full bg-zinc-900 text-white flex flex-col p-4 rounded-md shadow-xl">
                <div className="text-5xl p-2 m-2">
                    Welcome {name}
                </div>
                <div className="grid grid-cols-2 m-2 gap-6 lg:gap-20">

                    {Object.keys(metrics).length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        Object.keys(metrics).map((key) => (
                        <div className="border-2" key={key}>
                            {key}: {metrics[key]}
                        </div>
                        ))
                    )}


                    {/* {Object.keys(metrics).map((key)=>{  
                        <div className="border-2"> 
                            {key}: {metrics[key]}
                        </div>
                    })} */}

{/*                     
                    <div className="border-2"> 
                        Your Age: {age}
                    </div>
                    <div className="border-2"> 
                        Your Weight: {weight}
                    </div>
                    <div className="border-2"> 
                        Your Height: {height}
                    </div>
                    <div className="border-2"> 
                        Your BMI: {bmi}
                    </div> */}

                </div>
                
                {/* <form onSubmit={updateInfo} className="p-4">
                    
                    
                    <input 
                        className="mb-4 text-black"
                        value={tempAge}
                        onChange={(e)=>setTempAge(e.target.value)}
                        type="Number" 
                        placeholder="Update Age" 
                    /><br/>

                    <input 
                        className="mb-4 text-black"
                        value={tempHeight}
                        onChange={(e)=>setTempHeight(e.target.value)}
                        type="Number" 
                        placeholder="Update Height" 
                    /><br/>

                    <input 
                        className="mb-4 text-black"
                        value={tempWeight}
                        onChange={(e)=>setTempWeight(e.target.value)}
                        type="Number" 
                        placeholder="Update Weight" 
                    /><br/>

                    <input type="submit" value="Update Profile"/>
                </form> */}


            </div>
        </>
    )

}