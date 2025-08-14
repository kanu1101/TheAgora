import React, { useContext, useState } from 'react'
import placeholder from "../assets/avatar.png"
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar';
import {Camera} from 'lucide-react'
const Profile = () => {
    // const username = "krushnadev";
    // const email = "a@gmail.com";
    const {user, isUpdatingProfile, updateProfile} = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (e) => {
      try {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64image = reader.result;
          setSelectedImage(base64image);
          await updateProfile({profilePic: base64image});
        }
      } catch (error) {
          alert("couldn't udpate profile");
          console.log("error in updating profile pic", error.response?.data?.message || error.message);
      }
    }
  return (
    <div className='h-screen'>
      <Navbar/>
      <div className='flex justify-center align-middle w-full py-20'>
        <div className='bg-gray-800 p-10 rounded-3xl flex flex-col'>
          <div className='relative'>
            <img src={selectedImage || user.profilePic || placeholder} alt="Profile image" className='rounded-full object-cover size-52'/>

            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                -translate-1/4
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className='font-semibold'>username</p>
          <span className='p-4 inline-block'>{user.userName}</span>
          <p className='font-semibold'>email</p>
          <span className='p-4 inline-block'>{user.email}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
