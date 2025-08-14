import { Link, useNavigate } from 'react-router-dom'
import placeholder from "../assets/placeholder.jpg"
import { useAuth } from '../contexts/AuthContext'
import { MenuProvider, useMenu } from '../contexts/MenuContext';
import { useRef } from 'react';
import ProfileMenu from './profileMenu';

const PartNavbar = ({triggerRef}) => {  
    const navigate = useNavigate();
    const {toggleMenu, openMenu, isOpen} = useMenu();
    const {user, logout} = useAuth();
    const handleClick = async () => {
        await logout();
        navigate("/login");
    }
    
  return (

        <div className='flex p-4 bg-amber-400 rounded-b-md justify-between'>
            <div>
                <Link to="/">
                    <h1 className='text-gray-700 font-bold text-2xl ' >TheAgora</h1>
                </Link>
            </div>
            <div className='flex gap-10'>
                <Link to="/settings" className='px-4 py-2 bg-white rounded-md shadow text-black'>Settings</Link>
                <div className='hover:cursor-pointer' ref = {triggerRef} onClick={toggleMenu}>
                    <img src={user.profilePic || placeholder} alt="profilePic" className='rounded-full object-cover w-10 h-10' />
                </div>
                {/* <button className='' onClick={toggleMenu}></button> */}
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
  )
}

export default PartNavbar
