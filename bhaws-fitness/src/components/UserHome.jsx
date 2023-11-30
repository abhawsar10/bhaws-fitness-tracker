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

    const units = {
        'Age':'Years',
        'Weight':'Kgs',
        'Height':'Cm',
        'BMI': ''
    }
    const maxlimits = {
        'Age':99,
        'Weight':1000,
        'Height':1000,
        'BMI': Infinity,
    }
    const minlimits = {
        'Age':0,
        'Weight':0,
        'Height':0,
        'BMI': 0,
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
                'Age':data.info.userDetails.age || 0 ,
                'Weight':data.info.userDetails.weight.length > 0 ? data.info.userDetails.weight[0].weight : 0,
                'Height':data.info.userDetails.height.length > 0 ? data.info.userDetails.height[0].height : 0,
                'BMI':data.info.userDetails.BMI.length > 0 ? data.info.userDetails.BMI[0].BMI : 0,
            })
            console.log(metrics)

        }else{
            console.log(data.error)
        }
    }



    function inputIsValid(){
        
        Object.keys(metrics).map((key) => {
            if (metrics[key] < minlimits[key] || metrics[key] > maxlimits[key]){
                alert(`${key} value should be between ${minlimits[key]} and ${maxlimits[key]}`)
                return false
            }
        })
        return true 
    }

    async function updateInfo(event){

        event.preventDefault()

        if (inputIsValid()){

            const req = await fetch('http://localhost:6968/api/updateuserinfo',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                },
                body:JSON.stringify({
                    age: metrics['Age'] ,       //if these are undefined (as when account is created, these fields wont be sent in the request)
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
        else{
            populateDashboard()
            toggleEditmode()
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
                                <div className=" text-center font-teko text-9xl pt-4 -mb-4">
                                    
                                    {editMode ? (
                                        
                                        <input
                                            className="bg-gray-500 w-full text-white rounded-sm text-md text-center"
                                            value={metrics[key]}
                                            onChange={(e) => {
                                                
                                                let old_metrics = JSON.parse(JSON.stringify(metrics))
                                                old_metrics[key] = e.target.value
                                                setMetrics(old_metrics)

                                            }}
                                            type="number"
                                        />
                                        
                                    ) : (
                                        metrics[key] === undefined || metrics[key] === -1 || metrics[key] === 0 ? (
                                            `-`
                                            ) : (
                                            metrics[key]
                                            )
                                    )}
                                    
                                </div>
                                <div className=" text-center font-teko text-3xl">
                                    {units[key]}
                                </div>
                            </div>


                        ))
                    )}


                </div>
                


            </div>
        </>
    )

}