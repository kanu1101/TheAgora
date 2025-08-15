import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import DebateList from './pages/DebateList'
import { useAuth } from './contexts/AuthContext'
import Blog from './pages/Blog'
import CreateBlog from './pages/createBlog'
import Debate from './pages/Debate'
import Settings from './pages/Settings'
import CreateDebate from './pages/createDebate'
import MyBlogs from './pages/MyBlogs'
import MyDebates from './pages/MyDebates'
import { Toaster } from 'react-hot-toast'

function App() {
  const {user, checkAuth, loading} = useAuth();
  useEffect(() => {
        checkAuth();
      }, []);
  if(loading) return <p>Checking Auth...</p>
  return (
    <>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/' element={user? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>} />
        <Route path='/profile' element={user ? <Profile/> : <Navigate to="/login"/>} />
        <Route path='/debateList' element={ <DebateList/> }/>
        <Route path='/blog/:blogId' element={<Blog/>} />
        <Route path='/debate/:id' element={<Debate/>} />
        <Route path='/createBlog' element={<CreateBlog/>} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/createDebate' element={<CreateDebate />} />
        <Route path='/myBlogs' element={<MyBlogs/>} />
        <Route path='/myDebates' element={<MyDebates/>} />

      </Routes>
    </>
  )
}

export default App
