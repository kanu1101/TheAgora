import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import { Plus } from 'lucide-react';
import CreateMenu from '../components/CreateMenu';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


const HomePage = () => {
  const {user, isAuthenticated, logout, checkAuth, loading: authloading} = useAuth();
  const [isOpen, setisOpen] = useState(false);
  const {getBlogs, loading: blogLoading, blogs} = useBlog();
  const dropdownRef = useRef();
  useEffect(() => {
    getBlogs();
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setisOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  // const closeMenu = () => {
  //   setisOpen(false);
  // }
  // const openMenu=()=> {
  //   setisOpen(true);
  // }

  const toggleMenu = () => {
    setisOpen(prev => !prev);
  }
  if(blogLoading)  return <p>Loading...</p>
  return (
    <div className='flex flex-col justify-center relative '>
      <Navbar/>
      <div className='w-full flex flex-col py-3 '>
        <div className="relative flex items-center p-5 h-16">
          {/* Left-aligned button */}
          <div className='flex flex-col relative' ref={dropdownRef}>
            <button onClick={toggleMenu} className="bg-white px-4 h-10 flex items-center rounded-xl text-black hover:cursor-pointer gap-2">
              <Plus />
              <span>Create</span>
            </button>
            <AnimatePresence>
              {isOpen &&
                  <div className='absolute top-full mt-2 left-0'>
                  <CreateMenu/>
                  </div>
              }
            </AnimatePresence>
          </div>
          {/* Absolutely centered text */}
          <p className="absolute left-1/2 transform -translate-x-1/2 text-5xl">
            Hello {user.userName}!
          </p>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center min-h-[60vh]'>
        {blogs.length > 0 ?
          (<div>
            <p className='m-auto text-3xl my-10'>Latest Blogs: </p>
            {blogs.map((blog, index) => (
            <BlogCard
              key = {index}
              title = {blog.title}
              authorName = {blog.authorId.userName}
              profilePic = {blog.authorId.profilePic}
              date = {new Date(blog.createdAt).toLocaleDateString}
            />))}
          </div> )
          : (<p className='text-center text-gray-500'>No Blogs yet. Create the First Blog.</p>)
        }
      </div>


    </div>
  )
}

export default HomePage
