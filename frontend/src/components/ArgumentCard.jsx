import React from 'react'


const ArgumentCard = ({side, authorName, content, profilePic}) => {
  return (
    <div className= {`${side} === "for" ? "justify-self-end" : "justify-self-start"`} >
      <div className='flex gap-2 justify-start'>
        <img src={profilePic || "../assets/placeholder.jpg"} alt="author profile Pic" className='rounded-full w-5 h-5'/>
        <h1> {authorName} </h1>
      </div>
      <p> {content} </p>
    </div>
  )
}

export default ArgumentCard
