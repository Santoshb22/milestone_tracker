import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contextApi/AuthContext';
import MilestoneCard from './MilestoneCard';
import { IoIosAdd } from "react-icons/io";
import AddMilestoneForm from './AddMilestoneForm';

const PersonalMilestones = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useContext(AuthContext);
    const [showAddForm, setShowAddForm] = useState(false);
    
    const fetchPersonalMilestone = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones/personal`, {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            });
            const data = await res.json();
            if(!res.ok) throw new Error("Failed to get personal milestones");
            console.log(data?.personalMilestones);
            setData(data?.personalMilestones);
        } catch (error) {
            console.log("Error: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPersonalMilestone();
    }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <div>
        <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className='add-new-milestone border border-gray-300 mb-4 
                   rounded-lg px-4 py-1 flex items-center justify-center
                   gap-2 text-2xl bg-blue-100 md:w-1/2 h-20'>
            <IoIosAdd size = {36}/>
            <p>Create Milestone</p>
        </button>
        <div className={`my-1 ${showAddForm? "block" : "hidden"}`}>
            <AddMilestoneForm setData = {setData} setShowAddForm = {setShowAddForm}/>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-xl font-semibold">Loading...</p>
      ) : data.length !== 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((milestone) => (
            <MilestoneCard key={milestone._id} data={milestone} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No Personal milestones</p>
      )}
    </div>
  )
}

export default PersonalMilestones