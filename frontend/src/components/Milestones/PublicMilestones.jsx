import React, { useEffect, useState } from 'react';
import MilestoneCard from './MilestoneCard';

const PublicMilestones = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPersonalMilestone = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones`);
      const json = await res.json();
      if (!res.ok) throw new Error("Failed to get milestones");
      setData(json.data);
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalMilestone();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-xl font-semibold">Loading...</p>
      ) : data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((milestone) => (
            <MilestoneCard key={milestone._id} data={milestone} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No public milestones</p>
      )}
    </div>
  );
};

export default PublicMilestones;
