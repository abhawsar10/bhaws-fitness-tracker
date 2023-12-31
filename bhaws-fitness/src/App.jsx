import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import UserHome from './components/UserHome'
import Home from './components/Home'
import Landingpage from './components/LandingPage'

function App() {

  return (
    <div className='font-kanit'>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
