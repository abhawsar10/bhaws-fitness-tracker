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
                'Age':data.info.userDetails.age,
                'Weight':data.info.userDetails.weight,
                'Height':data.info.userDetails.height,
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
                age: metrics['Age'] ,
                height: metrics['Height'],
                weight: metrics['Weight'],
            })
        })

        const data = await req.json()
        console.log(data)

        if(data.status==='ok'){
            populateDashboard()
            toggleEditmode()
            
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
                            onClick={updateInfo} 
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
                                    
                                    {editMode ? (
                                        
                                        <input
                                            className="bg-gray-500 w-full text-white border-2 rounded-sm text-md text-center"
                                            value={metrics[key]}
                                            onChange={(e) => {
                                                
                                                let old_metrics = JSON.parse(JSON.stringify(metrics))
                                                old_metrics[key] = e.target.value
                                                setMetrics(old_metrics)

                                                // setTempValues[key](e.target.value); 
                                            }}
                                            type="number"
                                        />
                                        
                                    ) : (
                                        metrics[key] === undefined || metrics[key] === -1 ? (
                                            `-`
                                            ) : (
                                            metrics[key]
                                            )
                                    )}
                                    
                                </div>
                            </div>


                        ))
                    )}


                </div>
                


            </div>
        </>
    )

}