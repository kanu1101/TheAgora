import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

  return (
    <div className='flex justify-center h-screen '>
        <div className='bg-gray-400 rounded-3xl w-1/3 p-10 h-1/2 my-auto'>
            <form  onSubmit={handleSubmit} className='p-5 flex flex-col '>
                <p className='mb-1' >Email</p>
                <input className='px-2 py-1 outline outline-gray-500' type="email" placeholder='a@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <p className='mb-1' >password</p>
                <input className='block px-2 py-1 outline outline-gray-500' type="password" required placeholder='********' value = {password} onChange={(e) => {setPassword(e.target.value)}} minLength={6} />
                <button className='outline mt-2 w-1/3 mx-auto' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
