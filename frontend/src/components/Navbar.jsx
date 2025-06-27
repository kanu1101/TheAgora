import { Link } from 'react-router-dom'
import placeholder from "../assets/placeholder.jpg"
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {  
    const {user} = useAuth();
  return (
    <>
        <div className='flex p-4 bg-amber-400 rounded-b-md justify-between'>
            <div>
                <Link to="/">
                    <h1 className='text-black' >TheAgora</h1>
                </Link>
            </div>
            <div className='flex gap-2'>
                <Link to="/settings" className='px-4 py-2 bg-white rounded-md shadow text-black'>Settings</Link>
                <Link to="/profile" className='px-4 py-2 bg-white rounded-md shadow'><img src={user?.profilePic ||  placeholder} alt="profile pic" className='rounded-full w-6 h-6'/></Link>
            </div>
        </div>
    </>
  )
}

export default Navbar
