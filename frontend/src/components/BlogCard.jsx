import React, { useEffect } from 'react'
import placeholder from "../assets/placeholder.jpg"
import useBlog from "../contexts/BlogContext.jsx"

const BlogCard = ({title, authorName, profilePic, date}) => {

  return (
    <>
        <div className='w-1/4 h-1/5 bg-amber-400 rounded-md'>
            <div className='flex gap-2'>
                <div>
                    <img src={profilePic || placeholder} alt="profile pic" className='w-8 h-8 rounded-full'/>
                </div>
                <p>{authorName}</p>
            </div>
            <h2 className='block'>{title}</h2>
            <span>{date}</span>
        </div>
    </>
  )
}

export default BlogCard
