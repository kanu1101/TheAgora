import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMenu } from '../contexts/MenuContext';
import placeholder from '../assets/placeholder.jpg';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileMenu = ({triggerRef}) => {
    const { user } = useAuth();
    const { isOpen, closeMenu } = useMenu();
    const menuRef = useRef();

    // Close on outside click
    useEffect(() => {   
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && triggerRef?.current && !triggerRef.current.contains(event.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu, isOpen]);

    return (
        
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className='absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 z-50'
                    >
                        <div className='text-center mb-4 z-999'>
                            <img src={user.profilePic || placeholder} alt="User" className='rounded-full w-12 h-12 mx-auto' />
                            <p className='text-sm mt-2'>{user.username}</p>
                        </div>
                        <div className='flex flex-col gap-2 z-999'>
                            <Link to='/profile' className='text-black' onClick={closeMenu}>Profile</Link>
                            <Link to='/myBlogs' className='text-black' onClick={closeMenu}>Your Blogs</Link>
                            <Link to='/myDebates' className='text-black' onClick={closeMenu}>Your Debates</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        
       
    );
};

export default ProfileMenu;
