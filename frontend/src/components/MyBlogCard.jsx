import React, { useEffect } from 'react'
import placeholder from "../assets/placeholder.jpg"
import {useBlog} from "../contexts/BlogContext.jsx"

const BlogCard = ({title, authorName, profilePic, date, blogId}) => {
  const {deleteBlog, getAuthorBlogs} = useBlog();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if(!confirmDelete) return;
    deleteBlog(blogId);

  }
  useEffect(() => {
    getAuthorBlogs();
  }, [deleteBlog])
  return (
    <>
        <div className='w-1/4 h-1/5 bg-amber-400 rounded-md'>
            <div className='flex gap-2'>
              <div>
                <div>
                    <img src={profilePic || placeholder} alt="profile pic" className='w-8 h-8 rounded-full'/>
                </div>
                <p>{authorName}</p>
              </div>
              <div>
                <button onClick={handelDelete}>delete</button>
              </div>
            </div>
            <h2 className='block'>{title}</h2>
            <span>{date}</span>
        </div>
    </>
  )
}

export default BlogCard
