import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import DebateList from './pages/DebateList'
import { useAuth } from './contexts/AuthContext'

function App() {
  const {checkAuth, loading} = useAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(loading) return <p>Checking Auth...</p>
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/debateList' element={ <DebateList/> }/>
      </Routes>
    </>
  )
}

export default App
