import React from 'react'
import DebateCard from '../components/DebateCard'
import Navbar from '../components/Navbar'

const dummyDebates = [
    {
        creatorName: "Aryan",
        debateTitle: "Socrates",
        debateDescription: "debate about Socrates"
    },
    {
        creatorName: "Tanay",
        debateTitle: "Plato",
        debateDescription: "debate about Plato"
    },
    {
        creatorName: "Krushnadev",
        debateTitle: "Aristotle",
        debateDescription: "debate about Aristotle"
    }
]

const DebateList = () => {
  return (
    <div>
        <Navbar/>
      <p className='ml-5 mt-5'>Hot Debates: </p>
      {dummyDebates.map((debate, index) => (
        <DebateCard
            key={index}
            creatorName={debate.creatorName}
            debateTitle={debate.debateTitle}
            debateDescription={debate.debateDescription}
        />
      ))}
    </div>
  )
}

export default DebateList
