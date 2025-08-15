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
    <div className='h-screen flex flex-col'>
        <Navbar/>
        <div className='flex text-black flex-grow justify-center items-center '>
            <div className='bg-blue-100 rounded-2xl px-5 py-5 flex flex-col w-2/5'>
                <h1 className='text-2xl font-semibold mb-5 self-center'>Create a Blog</h1>
                <form className='flex flex-col items-start'  onSubmit={handleSubmit}>
                    <p className='mb-1'>Title</p>
                    <input className='bg-gray-200 mb-5 focus:border-black focus:border-1 focus:bg-gray-700 placeholder-gray-500 focus:placeholder-gray-500 focus:text-white w-full px-2 py-2 outline-1 outline-gray-400 text-black rounded-lg' type="text" placeholder='Title' name='title' value={formData.title} onChange={handleChange}/>
                    <p className='mb-1'>Blog Content</p>
                    <textarea type="text" className='bg-gray-200 min-h-[120px] transition-all duration-300 ease-in-out w-full px-2 py-1 outline-1 focus:border-black focus:border-1 focus:bg-gray-700 focus:text-white outline-gray-400 text-black placeholder-gray-500 focus:placeholder-gray-500 rounded-lg' name='content' placeholder='The Blog goes here...' value={formData.content} onChange={handleChange} />
                    <button type='submit' className='block border-gray-400 cursor-pointer hover:bg-blue-400 transition-all duration-300 ease-in-out border-1 rounded-lg mt-5 bg-blue-200 self-center px-4 py-2 text-black'>Create Blog</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateBlog
