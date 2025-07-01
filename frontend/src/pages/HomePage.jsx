import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';

// const dummyBlogs = [
//   {
//     title: "Is morality objective?",
//     authorName: "Socrates",
//     profilePic: "", // add URL or leave empty to use placeholder
//     date: "June 27, 2025",
//   },
//   {
//     title: "The illusion of free will",
//     authorName: "Nietzsche",
//     profilePic: "",
//     date: "June 25, 2025",
//   },
//   {
//     title: "Consciousness and AI",
//     authorName: "DescartesGPT",
//     profilePic: "",
//     date: "June 23, 2025",
//   },
//   // ...add more if you want to test
// ];

const HomePage = () => {
  const {user, isAuthenticated, logout, checkAuth, loading: authloading} = useAuth();
  const {getBlogs, loading: blogLoading, blogs} = useBlog();

  useEffect(() => {
    checkAuth();
    getBlogs();
  }, [isAuthenticated]);

  if(authloading) return <p>Checking Auth...</p>
  if(blogLoading) return <p>Loading...</p>
  return (
    <div>
      <Navbar/>
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
