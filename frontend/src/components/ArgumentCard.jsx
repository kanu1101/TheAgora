import React from 'react'

const ArgumentCard = ({argument}) => {
  return (
    <div className= {`argument.side === "for" ? "justify-self-end" : "justify-self-start"`} >
      <h1> {argument.authorId.userName} </h1>
      <p> {argument.content} </p>
    </div>
  )
}

export default ArgumentCard
