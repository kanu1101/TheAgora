import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Signup= () => {
    const {signup} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        signup({userName: username, password, email})
    }

  return (
    <div>
        <div>
            <form className=''>
                <p>Username</p>
                <input type="text" placeholder='username' value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                <p>Email</p>
                <input type="email" placeholder='a@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <p>password</p>
                <input className='block' type="password" required placeholder='********' value = {password} onChange={(e) => {setPassword(e.target.value)}} minLength={6} />
                <Link onClick={handleSubmit} to="/">Sign Up</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup
