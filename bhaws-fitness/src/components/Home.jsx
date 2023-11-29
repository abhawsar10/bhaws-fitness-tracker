import React from "react";
import Sidebar from "./Sidebar";
import UserHome from "./UserHome";

export default function Home(){

    return(
        <div className="flex">
            <Sidebar/>
            <div className="w-full h-screen bg-slate-600 p-4">
                <UserHome/> 
            </div>
        </div>
    )
}