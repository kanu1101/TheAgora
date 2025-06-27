import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard';
import { useAuth } from '../contexts/AuthContext';

const dummyBlogs = [
  {
    title: "Is morality objective?",
    authorName: "Socrates",
    profilePic: "", // add URL or leave empty to use placeholder
    date: "June 27, 2025",
  },
  {
    title: "The illusion of free will",
    authorName: "Nietzsche",
    profilePic: "",
    date: "June 25, 2025",
  },
  {
    title: "Consciousness and AI",
    authorName: "DescartesGPT",
    profilePic: "",
    date: "June 23, 2025",
  },
  // ...add more if you want to test
];

const HomePage = () => {
  const {user, isAuthenticated, logout, checkAuth, loading} = useAuth();
  if(loading) return <p>Checking Auth...</p>
  return (
    <div>
      <Navbar/>
      <p>Latest Blogs: </p>
      {dummyBlogs.map((blog, index) => (
        <BlogCard
            key = {index}
            title = {blog.title}
            authorName = {blog.authorName}
            profilePic = {blog.profilePic}
            date = {blog.date}
        />
      ))}

    </div>
  )
}

export default HomePage
