import React, { useState } from 'react'
import { useDebate } from '../contexts/DebateContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
    <>
      <Navbar />
      <div className="flex justify-center py-20 px-4 text-black">
        <div className="bg-blue-100 shadow-xl rounded-2xl p-10 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create a Debate</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                placeholder="Enter debate title"
                name="title"
                onChange={handleChange}
                value={formData.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                placeholder="Enter debate description"
                name="description"
                onChange={handleChange}
                value={formData.description}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
              >
                Create Debate
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default CreateDebate
