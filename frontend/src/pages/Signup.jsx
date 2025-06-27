import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup= () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

  return (
    <div>
        <div>
            <form onSubmit={handleSubmit} className=''>
                <p>Username</p>
                <input type="text" placeholder='username' value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                <p>Email</p>
                <input type="email" placeholder='a@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <p>password</p>
                <input className='block' type="password" required placeholder='********' value = {password} onChange={(e) => {setPassword(e.target.value)}} minLength={6} />
                <button type='submit'>Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup
