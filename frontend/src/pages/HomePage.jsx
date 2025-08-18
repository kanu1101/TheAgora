import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import { Plus } from 'lucide-react';
import CreateMenu from '../components/CreateMenu';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDebate } from '../contexts/DebateContext';


const HomePage = () => {
  const {user, isAuthenticated, logout, checkAuth, loading: authloading} = useAuth();
  const {getUserDebates, debates, loading: debateLoading} = useDebate();
  const [isOpen, setisOpen] = useState(false);
  const {getBlogs, loading: blogLoading, blogs} = useBlog();
  const [sect, setSect] = useState("blog");
  const dropdownRef = useRef();
  const blogHandler = () => {
    setSect("blog");
  }
  const debateHandler = async () => {
    setSect("debate");
    console.log(debates.length);
    if(debates.length === 0){
      await getUserDebates();
    }
  }
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
                  <div className='absolute top-full mt-2 left-0 w-full'>
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
      <div className='mx-auto bg-blue-200 min-w-[40vw]'>
        <div className='flex justify-between'>
              <button className={`text-center w-1/2 py-4 ${sect === "blog" ? "bg-cyan-700" : "bg-blue-200"} border-r-blue-400  cursor-pointer  text-black border-b-blue-400 border-b-1`} onClick={blogHandler}>Blogs</button>
              <button className={`w-1/2 text-center py-4 ${sect === "debate" ? "bg-cyan-700" : "bg-blue-200"} border-l-blue-400 border-l-1 border-b-blue-400 border-b-1 cursor-pointer text-black`} onClick={debateHandler}>Debates</button>
        </div>
        <div className='cardSection flex-1 flex justify-center min-h-[60vh] overflow-auto'>

          {sect === "blog" ?
          blogLoading ? <p>loading blogs.</p> : 
          blogs.length > 0 ?
            (<div className='flex flex-col '>
              <p className='m-auto text-3xl text-black my-10'>Latest Blogs: </p>
              <div className='flex gap-5'>
                {blogs.map((blog, index) => (
                <BlogCard
                  key = {index}
                  blogId = {blog._id}
                  title = {blog.title}
                  authorName = {blog.authorId.userName}
                  profilePic = {blog.authorId.profilePic}
                  date = {new Date(blog.createdAt).toLocaleDateString()}
                />))}
              </div>
            </div> )
            : (<p className='text-center text-gray-500'>No Blogs yet. Create the First Blog.</p>)
           : debateLoading ? <p>loading debates.</p> : 
           debates.length > 0 ? (<div className='flex flex-col '>
              <p className='m-auto text-3xl text-black my-10'>Latest Blogs: </p>
              <div className='flex gap-5'>
                {debates.map((debate, index) => (
                <BlogCard
                  key = {index}
                  debateId = {debate._id}
                  debateTitle = {debate.title}
                  creatorName = {debate.authorId.userName}
                  profilePic = {debate.authorId.profilePic}
                  debateDescription = {debate.description}
                />))}
              </div>
            </div>) : (<p>no debates yet.</p>)}

          
        </div>
      </div>
    </div>
  )
}

export default HomePage
