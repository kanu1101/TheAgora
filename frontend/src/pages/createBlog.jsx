import React from 'react'
import { useState } from 'react'
import { useBlog } from '../contexts/BlogContext';
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';


const CreateBlog = () => {
    const [formData, setFormData] = useState({title: "", content: ""});
    const {postBlog} = useBlog();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = await postBlog(formData);
        if(blog && blog._id){
            navigate(`/blog/${blog._id}`)
        } else {
            alert("something went wrong while creating the blog");
        }
    }

    return (
    <>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <p>Title</p>
            <input type="text" placeholder='title' name='title' value={formData.title} onChange={handleChange}/>
            <p>Blog Content</p>
            <input type="text" name='content' placeholder='The Blog goes here...' value={formData.content} onChange={handleChange} />
            <button type='submit' >Create Blog</button>
        </form>
    </>
  )
}

export default CreateBlog
