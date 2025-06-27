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
    <div>
        <div>
            <form onSubmit={handleSubmit} className=''>
                <p>Email</p>
                <input type="email" placeholder='a@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <p>password</p>
                <input className='block' type="password" required placeholder='********' value = {password} onChange={(e) => {setPassword(e.target.value)}} minLength={6} />
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
