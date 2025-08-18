import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateMenu = () => {
  const menuRef = useRef();
  const navigate = useNavigate();
  const handleDebateRedirect = () => {
    navigate('/createDebate')
  }
  const handleBlogRedirect = () => {
    navigate('/createBlog');
  }
  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className='bg-white py-3 rounded-2xl'
    >
      <button onClick={handleDebateRedirect} className='block mb-1 text-black cursor-pointer w-full'>Debate</button>
      <button onClick={handleBlogRedirect} className='block text-black cursor-pointer w-full'>Blog</button>       
    </motion.div>
  )
}

export default CreateMenu