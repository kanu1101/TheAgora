import { useDebate } from '../contexts/DebateContext'
import MyDebateCard from '../components/MyDebateCard';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
const MyDebates = () => {
  const {debates, getAuthorDebates} = useDebate();
  useEffect(async () => {
    await getAuthorDebates();
  }, [debates, getAuthorDebates]);
  return (
    <>
        <Navbar/>
        <div className='flex gap-5'>
        {debates.map((debate, index) => {
            <MyDebateCard
                key={index}
                title = {debate.title}
                description = {debate.descirption}
                debateId = {debate._id}
            />
        })}
        </div>
    </>
  )
}
export default MyDebates