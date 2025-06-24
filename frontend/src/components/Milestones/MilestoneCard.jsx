import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contextApi/AuthContext';
import {useNavigate} from "react-router-dom";

const MilestoneCard = ({ data }) => {
  const { title, date, note } = data;
  const [tipInput, setTipInput] = useState("");     
  const [tips, setTips] = useState([]);             
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {authStatus} = useContext(AuthContext);

  const handleCommentSubmit = async (e) => {
  e.preventDefault();

  if(!authStatus){
    alert("Authentication required for this action.");
    navigate("/register")
  }
  setError(""); 

  if (!tipInput.trim()) {
    setError("Tip should not be empty");
    return;
  }

  const tip = {
    tip: tipInput
  };

  try {
    const postTip = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones/${data._id}/tips`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(tip) 
    });
    if (!postTip.ok) throw new Error("Failed to post tip");
    const resData = await postTip.json();

    setTips(prev => [...prev, resData.tip]);
    setTipInput("");
  } catch (error) {
    setError(error.message || "Something went wrong");
    console.log("Error: ", error.message);
  }
};

  useEffect(() => {
    const fetchTips = async() => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones/${data._id}/tips`
        );
  
        const tipsData = await res.json();
        if (!res.ok) throw new Error("Failed to fetch tips");
        setTips(tipsData.tips);
      } catch (error) {
        console.log("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTips();
  }, [data._id]);

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-5 mb-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-1">📅 {new Date(date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4">{note}</p>

      {/* Tip form */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <label htmlFor="tip" className="block text-sm font-medium text-gray-700 mb-1">
          Add a tip
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="tip"
            placeholder="Write a tip..."
            value={tipInput}
            onChange={(e) => setTipInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <span className='text-red-600'>{error}</span>
          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300"
          >
            Post
          </button>
        </div>
      </form>

      <div className="bg-gray-100 py-3 px-4 mt-5 rounded-md">
        <h4 className="font-semibold text-gray-600 mb-2">Tips ({tips.length})</h4>
        {loading && <p>Loading tips...</p>}
        {tips.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {tips.map((tip) => (
              <li key={tip?._id} className="text-sm text-gray-800">
                {tip?.tip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tips yet.</p>
        )}
      </div>
    </div>
  );
};

export default MilestoneCard;
