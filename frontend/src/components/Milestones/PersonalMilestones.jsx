import React, { useEffect, useState } from 'react'

const PersonalMilestones = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchPersonalMilestone = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones/personal`);
            const data = await res.json();
            if(!res.ok) throw new Error("Failed to get personal milestones");
            console.log(data);
        } catch (error) {
            console.log("Error: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // fetchPersonalMilestone();
    }, [])

  return (
    <div>PersonalMilestones</div>
  )
}

export default PersonalMilestones