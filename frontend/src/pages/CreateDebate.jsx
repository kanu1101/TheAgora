import React, { useState } from 'react'
import { useDebate } from '../contexts/DebateContext';
import { useNavigate } from 'react-router-dom';
const CreateDebate = () => {
    const navigate = useNavigate();
    const {createDebate} = useDebate();
    const [formData, setFormData] = useState({title: "", description: ""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const debate = await createDebate(formData);
        if(debate && debate._id){
            navigate(`/debate/${debate._id}`)
        } else {
            alert("something went wrong when creating the debate");
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <input type="text" placeholder='title' name='title' onChange={handleChange} value={formData.title}/>
        <h3>Description</h3>
        <input type="text" placeholder='description' name='description' onChange={handleChange} value={formData.description}/>
        <button type='submit' >Create Debate</button>
      </form>
    </div>
  )
}

export default CreateDebate
