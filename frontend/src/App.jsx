import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import DebateList from './pages/DebateList'
import { useAuth } from './contexts/AuthContext'

function App() {
  const {user, checkAuth, loading} = useAuth();
  
  if(loading) return <p>Checking Auth...</p>
  return (
    <>
      <Routes>
        <Route path='/' element={user? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>} />
        <Route path='/profile' element={user ? <Profile/> : <Navigate to="/login"/>} />
        <Route path='/debateList' element={ <DebateList/> }/>
      </Routes>
    </>
  )
}

export default App
