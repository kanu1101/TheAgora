import React, { useEffect } from 'react'
import MyBlogCard from '../components/BlogCard'
import { useBlog } from '../contexts/BlogContext'
import Navbar from '../components/Navbar';

const MyBlogs = () => {
    const {getAuthorBlogs, blogs} = useBlog();
  useEffect(() => {
    getAuthorBlogs();
  } ,[blogs])
  return (
    <div>
      <Navbar/>
      {blogs.map((blog, index) => {
        <MyBlogCard 
          key={index}
          title = {blog.title}
          authorName = {blog.authorId.userName}
          profilePic = {blog.authorId.profilePic}
          date = {new Date(blog.createdAt).toLocaleDateString}
          blogId = {blog._id}
        />
      })}
    </div>
  )
}

export default MyBlogs
