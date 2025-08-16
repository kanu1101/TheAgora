import React from 'react'
import { useDebate } from '../contexts/DebateContext'
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import placeholder from '../assets/placeholder.jpg'
const ArgumentCard = ({side, authorName, content, profilePic, authorId, argumentId}) => {
  const {user} = useAuth();
  const {deleteArgument} = useDebate();
  const {debateId} = useParams();
  const handleDelete = async (e) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this argument?");
    if(!confirmDelete) return;
    await deleteArgument({argumentId, debateId, type: "user"});
  }
  return (
    <div className= {side === "for" ? "justify-self-end" : "justify-self-start"} >
      <div className='flex gap-2 justify-between'>
        <div>
          {user._id === authorId && (<button onClick={handleDelete} >delete</button>)}
          {/* {true && (<button onClick={handleDelete} >delete</button>)} */}
        </div>
        <div className='flex gap-2 justify-start'>
          <img src={profilePic || placeholder} alt="author profile Pic" className='rounded-full w-5 h-5'/>
          <h1> {authorName} </h1>
        </div>
      </div>
      <p> {content} </p>
    </div>
  )
}

export default ArgumentCard
