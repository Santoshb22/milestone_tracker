import React, { useContext } from 'react'
import PersonalMilestones from '../components/Milestones/PersonalMilestones'
import PublicMilestones from '../components/Milestones/PublicMilestones'
import { AuthContext } from '../contextApi/AuthContext'

const Milestones = () => {
  const {authStatus} = useContext(AuthContext);

  return (
    <div className='px-6 py-2'>
      <div className={`${authStatus? "block" : "hidden"}`}>
        <p className='text-2xl font-semibold'>Your Milestones</p>
        <PersonalMilestones/>
        <hr className='opacity-20 my-4' />
      </div>
      <p className='text-2xl font-semibold'>All User's Milestones</p>
      <PublicMilestones/>
    </div>
  )
}

export default Milestones