import React from 'react'
import { useState } from 'react'
import { useBlog } from '../contexts/BlogContext';
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';


const createBlog = () => {
    const [formData, setFormData] = useState({title: "", content: ""});
    const {postBlog} = useBlog();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = await postBlog(formData);
        navigate(`/blog/${blog._id}`)
    }

    return (
    <>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <p>Title</p>
            <input type="text" placeholder='title' value={formData.title} onChange={() => setFormData({...formData, title: e.target.value})}/>
            <p>Blog Content</p>
            <input type="text" placeholder='The Blog goes here...' value={formData.content} onChange={() => setFormData({...formData, content: e.target.value})} />
            <button type='submit' >Create Blog</button>
        </form>
    </>
  )
}

export default createBlog
