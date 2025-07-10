import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MenuProvider, useMenu } from '../contexts/MenuContext';
import placeholder from '../assets/placeholder.jpg';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileMenu = () => {
    const { user } = useAuth();
    const { isOpen, closeMenu } = useMenu();
    const menuRef = useRef();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu]);

    return (
        <MenuProvider>
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
                        <div className='text-center mb-4'>
                            <img src={user.profilePic || placeholder} alt="User" className='rounded-full w-12 h-12 mx-auto' />
                            <p className='text-sm mt-2'>{user.username}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Link to='/profile' onClick={closeMenu}>Profile</Link>
                            <Link to='/myBlogs' onClick={closeMenu}>Your Blogs</Link>
                            <Link to='/myDebates' onClick={closeMenu}>Your Debates</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MenuProvider>
    );
};

export default ProfileMenu;
