import React from 'react'
import placeholder from "../assets/placeholder.jpg"
import { useAuth } from '../contexts/AuthContext'
const Profile = () => {
    // const username = "krushnadev";
    // const email = "a@gmail.com";
  const {user} = useAuth();
  return (
    <div className='flex justify-center align-middle w-full h-screen py-40'>
      <div className='bg-gray-800 p-10 rounded-3xl flex flex-col'>
        <img src={placeholder} alt="Profile image" className='rounded-full w-52 h-52 mb-10'/>
        <p className='font-semibold'>username</p>
        <span className='p-4 inline-block'>{user.userName}</span>
        <p className='font-semibold'>email</p>
        <span className='p-4 inline-block'>{user.email}</span>
      </div>
    </div>
  )
}

export default Profile
