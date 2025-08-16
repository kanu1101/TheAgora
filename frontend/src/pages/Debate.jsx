import React, { useState, useEffect } from 'react'
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
  const [argumentContent, setArgumentContent] = useState({debateId: debateId, content: "", side: "", type: "user"});


  const handleClick = async (e) => {
    const trimmedArgument = argumentContent.content.trim();
    if(!trimmedArgument) return;
    const area = document.querySelector("#argumentArea");
    area.value = "";
    setArgumentContent({debateId, content: "", side: "", type: "user"});
    await createArgument(argumentContent);
  }

  const handleButtonClick = (e) => {
    console.log("initiating side change");
    e.target.name === "for" ? setArgumentContent({...argumentContent, side : "for"}) : setArgumentContent({...argumentContent, side : "against"});
  }

  useEffect(() => {
    const fetchDebate = async () => {
      if(debateId){
        console.log("getting Debate...");
        await getDebate(debateId, "user");
      }
      else {
        console.log("Didn't start for some reason");
      }
    }
    fetchDebate();
  }, [debateId]);

  if(loading) return (<h1>Loading...</h1>)
    if(!debate) return (<h1>debate not found...</h1>)

  return (
    <div>
      <Navbar/>
      <div>
        <h1>{debate.title}</h1>
        <div className='p-10'>
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
              <div className='text-black flex gap-2'>
                <button className={`${argumentContent.side === "for" ? "border-red-400 border-1" : "border-transparent"} bg-blue-50  p-2`} onClick={handleButtonClick} name='for'>For</button>
                <button className={`${argumentContent.side === "against" ? "border-red-400 border-1" : "border-transparent"} bg-blue-50  p-2`} onClick={handleButtonClick} name='against'>Against</button>
                
                {/*for and against buttons to be created here*/}
              </div>
              <div className='flex gap-2'>
                <input id='argumentArea' type="text" value={argumentContent.content} onChange={(e) => setArgumentContent({...argumentContent, content: e.target.value })} placeholder='write your argument here' />
                <button onClick={handleClick}>Send</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Debate
