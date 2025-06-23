import React, { useContext } from 'react'
import { SiPivotaltracker } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from '../../contextApi/AuthContext';
import HeaderButton from './HeaderButton';
import { Link } from 'react-router';

const Header = () => {
    const {user, authStatus} = useContext(AuthContext);

  return (
    <header className='flex justify-between items-center p-5 bg-blue-100'>
        <div className='flex items-center gap-2'>
            <div className='text-blue-500'>
                <SiPivotaltracker size={34}/>
            </div>
            <p className='text-2xl'>
                <span className='text-pink-500'>Milestone</span> <span className='text-blue-500'>Tracker</span>
            </p>
        </div>

        {authStatus? (
        <div className='flex items-center gap-2'>
            <div>
                <FaRegCircleUser size={34}/>
            </div>
            <p className='text-2xl'>
                {user.username}
            </p>
        </div>
        ) : (
            <div>
                <ul className='flex items-center gap-4 text-xl font-semibold'>
                    <li><Link to = "login"><HeaderButton text = {"Login"}/></Link></li>
                    <li><Link to = "/register"><HeaderButton text = {"Sign Up"}/></Link></li>
                </ul>
            </div>
        )}
    </header>
  )
}

export default Header