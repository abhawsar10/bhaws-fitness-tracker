import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import UserHome from './components/UserHome'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/dashboard" element={<UserHome/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
