import React from 'react'
import placeholder from '../assets/placeholder.jpg'
const DebateCard = ({creatorName, debateDescription, debateTitle, profilePic}) => {

  return (
    <div className='bg-gray-500 rounded-2xl w-1/4 p-4 mb-2 mt-4 ml-10'>
      <div className='flex gap-2 justify-start align-middle'>
      <img src={profilePic || "../assets/placeholder.jpg"} alt="author profile pic" className='rounded-full w-5 h-5' />
      <p>{creatorName}</p>
      </div>
      <span>{debateTitle}</span>
      <p>{debateDescription}</p>

    </div>
  )
}

export default DebateCard
