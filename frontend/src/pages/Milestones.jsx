import React from 'react'
import PersonalMilestones from '../components/Milestones/PersonalMilestones'
import PublicMilestones from '../components/Milestones/PublicMilestones'

const Milestones = () => {

  return (
    <div>
      <p className='text-2xl font-semibold'>All User's Milestone</p>
      <PersonalMilestones/>
      <hr className='opacity-20 my-4' />
      <p className='text-2xl font-semibold'>All User's Milestone</p>
      <PublicMilestones/>
    </div>
  )
}

export default Milestones