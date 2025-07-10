import React from 'react'
import Navbar from "./Navbar"
import { useDebate } from '../contexts/DebateContext'
const MyDebateCard = ({title, description, debateId}) => {
    const {deleteDebate} = useDebate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("are you sure you want to delete this debate?");
        if(!confirmDelete) return;
        await deleteDebate(debateId);
    }

  return (
    <div>
        <div className='flex justify-between'>
            <h3>{title}</h3>
            <button onClick={handleDelete}>delete</button>
        </div>  
        <div>
            <p>{description} </p>
        </div>
    </div>
  )
}

export default MyDebateCard
