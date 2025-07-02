import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';



const HomePage = () => {
  const {user, isAuthenticated, logout, checkAuth, loading: authloading} = useAuth();
  const {getBlogs, loading: blogLoading, blogs} = useBlog();

  useEffect(() => {
    getBlogs();
  }, [])

  if(blogLoading)  return <p>Loading...</p>
  return (
    <div>
      <Navbar/>
      <p>hello {user.userName}</p>
      <p>Latest Blogs: </p>
      {blogs.map((blog, index) => (
        <BlogCard
            key = {index}
            title = {blog.title}
            authorName = {blog.authorId.userName}
            profilePic = {blog.authorId.profilePic}
            date = {new Date(blog.createdAt).toLocaleDateString}
        />
      ))}

    </div>
  )
}

export default HomePage
