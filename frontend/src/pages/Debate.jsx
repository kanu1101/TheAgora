import React from 'react'
import Navbar from "../components/Navbar"
import ArgumentCard from '../components/ArgumentCard'

const Arguments = [
    {
        username: "krushnadev",
        debateId : 1,
        debateModel: "UserDebate",
        authorId: 1,
        content: "hey this is the first for argument",
        side: "for",
    },
    {
        username: "aryan",
        debateId : 2,
        debateModel: "UserDebate",
        authorId: 2,
        content: "hey this is the first against argument",
        side: "against",
    },
]

const Debate = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <h1>Debate Title</h1>
        <div>
            {Arguments.map((argument, index) => (
                <ArgumentCard 
                    key={index}
                    argument = {argument}
                />
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default Debate
