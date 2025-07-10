import { Link, useNavigate } from 'react-router-dom'
import placeholder from "../assets/placeholder.jpg"
import { useAuth } from '../contexts/AuthContext'
import { MenuProvider, useMenu } from '../contexts/MenuContext';

const Navbar = () => {  
    const navigate = useNavigate();
    const {toggleMenu} = useMenu();
    const {user, logout} = useAuth();
    const handleClick = async () => {
        await logout();
        navigate("/login");
    }
    
  return (
    <MenuProvider>
        <div className='flex p-4 bg-amber-400 rounded-b-md justify-between'>
            <div>
                <Link to="/">
                    <h1 className='text-black' >TheAgora</h1>
                </Link>
            </div>
            <div className='flex gap-2'>
                <Link to="/settings" className='px-4 py-2 bg-white rounded-md shadow text-black'>Settings</Link>
                <button className='' onClick={toggleMenu}><img src={user.profilePic || placeholder} alt="profilePic" className='rounded-full w-6 h-6' /></button>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
    </MenuProvider>
  )
}

export default Navbar
