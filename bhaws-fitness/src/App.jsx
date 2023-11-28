import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import UserHome from './components/UserHome'
import Landingpage from './components/LandingPage'

function App() {

  return (
    <div className='font-kanit'>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/dashboard" element={<UserHome/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
