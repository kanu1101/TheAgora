import React from 'react'
import placeholder from '../assets/placeholder.jpg'
const DebateCard = ({creatorName, debateDescription, debateTitle}) => {

  return (
    <div className='bg-gray-500 rounded-2xl w-1/4 p-4 mb-2 mt-4 ml-10'>
      <p>{creatorName}</p>
      <span>{debateTitle}</span>
      <p>{debateDescription}</p>

    </div>
  )
}

export default DebateCard
