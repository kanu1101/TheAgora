import React, { useEffect } from 'react'
import placeholder from "../assets/placeholder.jpg"
import {useBlog} from "../contexts/BlogContext.jsx"
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blogId, title, authorName, profilePic, date}) => {
  const navigate = useNavigate();

  return (
    <>
        <div onClick={() => navigate(`/blog/${blogId}`)} className='p-2 cursor-pointer h-1/5 text-black bg-blue-200 rounded-md flex flex-col'>
            <div className='flex gap-2'>
                <div>
                    <img src={profilePic || placeholder} alt="profile pic" className='w-8 h-8 rounded-full'/>
                </div>
                <p>{authorName}</p>
            </div>
            <h2 className='block font-semibold self-center '>{title}</h2>
            <span>{date}</span>
        </div>
    </>
  )
}

export default BlogCard
