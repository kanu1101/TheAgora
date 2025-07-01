import React from 'react'
import Navbar from "../components/Navbar"
import ArgumentCard from '../components/ArgumentCard'
import { useDebate } from '../contexts/DebateContext'
import { useParams } from 'react-router-dom'

// const Arguments = [
//     {
//         username: "krushnadev",
//         debateId : 1,
//         debateModel: "UserDebate",
//         authorId: 1,
//         content: "hey this is the first for argument",
//         side: "for",
//     },
//     {
//         username: "aryan",
//         debateId : 2,
//         debateModel: "UserDebate",
//         authorId: 2,
//         content: "hey this is the first against argument",
//         side: "against",
//     },
// ]

const Debate = () => {
  const {debateId} = useParams();
  const {getDebate, debate} = useDebate();

  useEffect(() => {
    if(debateId){
      getDebate(debateId);
    }
  }, [debateId]);

  return (
    <div>
      <Navbar/>
      <div>
        <h1>{debate.title}</h1>
        <div>
            {debate.arguments.map((argument, index) => (
                <ArgumentCard 
                    key={index}
                    content = {argument.content}
                    side = {argument.side}
                    authorName = {argument.authorId.userName}
                    profilePic = {argument.authorId.profilePic}
                />
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default Debate
