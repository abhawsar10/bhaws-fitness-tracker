import React, { useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserMertric from "./UserMetric";


export default function UserHome(){

    const navigate = useNavigate()

    const [editMode,setEditMode] = useState(false)
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [tempAge, setTempAge] = useState('')
    const [tempWeight, setTempWeight] = useState('')
    const [tempHeight, setTempHeight] = useState('')
    
    const [metrics, setMetrics] = useState({})

    function toggleEditmode(){
        setEditMode(!editMode)
    }



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
                'AGE':data.info.userDetails.age,
                'WEIGHT':data.info.userDetails.weight,
                'HEIGHT':data.info.userDetails.height,
                'BMI':data.info.userDetails.BMI,
            })
            console.log(metrics)

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
            <div className="h-full w-full bg-zinc-900 item text-white flex flex-col p-4 rounded-md shadow-xl">
                <div className=" flex justify-between items-center m-6  ">
                    <div className="order-first text-5xl">Welcome {name}</div>

                    {editMode!==true && 
                        <div 
                            onClick={toggleEditmode} 
                            className="order-last bg-blue-500 text-xl py-2 px-4 rounded-md shadow-lg cursor-pointer"
                        >
                            + Entry
                        </div>
                    }

                    {editMode &&
                        <div 
                            onClick={toggleEditmode} 
                            className="order-last bg-green-500 text-xl py-2 px-4 rounded-md shadow-lg cursor-pointer"
                        >
                            Save Entry
                        </div>
                    }

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
                                m-6 gap-6 lg:gap-10"
                >

                    {Object.keys(metrics).length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        Object.keys(metrics).map((key) => (
                            
                            <div key={key} 
                                className="bg-gray-600 min-h-40 p-6 rounded-md shadow-lg" 
                            >
                                <div className=" text-center font-teko text-3xl">
                                    {key}
                                </div>
                                <div className=" text-center font-teko text-9xl py-6">
                                    {(metrics[key]===undefined || metrics[key]=== -1 )? `-` : metrics[key] }
                                    
                                </div>
                            </div>


                        ))
                    )}


                </div>
                
                <form onSubmit={updateInfo} className="p-4">
                    
                    
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
                </form>


            </div>
        </>
    )

}