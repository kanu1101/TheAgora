import React, { useState } from 'react'
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
  const {getDebate, debate, createArgument, loading} = useDebate();
  const [argumentContent, setArgumentContent] = useState({debateId: debate._id, content: "", side: "", type: "for"});


  const handleClick = async () => {
    const trimmedArgument = argument.trim();
    if(!trimmedArgument) return;
    await createArgument(argumentContent);
  }

  useEffect(() => {
    const fetchDebate = async () => {
      if(debateId){
        await getDebate(debateId);
      }
    }
    fetchDebate();
  }, [debateId, debate.arguments]);

  if(loading || !debate) return <h1>Loading...</h1>

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
                    authorId = {argument.authorId}
                    argumentId = {argument._id}
                />
            ))
            }
            <div>
              <div className='flex gap-2'>
                <button className={`${argumentContent.side} === "for" ? outline-red-500 : outline-none `} onClick={() => setArgumentContent({...argumentContent, side: "for"})}>For</button>
                <button className={`${argumentContent.side} === "against" ? outline-red-500 : outline-none `} onClick={() => setArgumentContent({...argumentContent, side: "against"})}>Against</button>
                
                {/*for and against buttons to be created here*/}
              </div>
              <div className='flex gap-2'>
                <input type="text" value={argumentContent} onChange={() => setArgumentContent({...argumentContent, content: value })} placeholder='write your argument here' />
                <button onClick={handleClick}>Send</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Debate
