import React, { useEffect } from 'react'
import DebateCard from '../components/DebateCard'
import Navbar from '../components/Navbar'
import { useDebate } from '../contexts/DebateContext'

// const dummyDebates = [
//     {
//         creatorName: "Aryan",
//         debateTitle: "Socrates",
//         debateDescription: "debate about Socrates"
//     },
//     {
//         creatorName: "Tanay",
//         debateTitle: "Plato",
//         debateDescription: "debate about Plato"
//     },
//     {
//         creatorName: "Krushnadev",
//         debateTitle: "Aristotle",
//         debateDescription: "debate about Aristotle"
//     }
// ]

const DebateList = () => {
  const {getUserDebates, debates} = useDebate();
  useEffect(() => {
    getUserDebates();
  } , []);

  return (
    <div>
        <Navbar/>
      <p className='ml-5 mt-5'>Hot Debates: </p>
      {debates.map((debate, index) => (
        <DebateCard
            key={index}
            creatorName={debate.authorId.userName}
            debateTitle={debate.title}
            debateDescription={debate.decription}
            profilePic = {debate.authorId.profilePic}
        />
      ))}
    </div>
  )
}

export default DebateList
