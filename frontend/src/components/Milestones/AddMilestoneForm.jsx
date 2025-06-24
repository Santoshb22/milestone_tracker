import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contextApi/AuthContext';

const AddMilestoneForm = ({setData, setShowAddForm, editData = null, isEdit = false, onUpdate, clearEditData}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    note: ''
  })
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        title: editData.title,
        date: editData.date,
        note: editData.note
      });
    }
  }, [editData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
      if (isEdit) {
          await onUpdate(editData._id, formData);
          setFormData({ title: '', date: '', note: '' });
          setShowAddForm(false);
          clearEditData();
        } else {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/milestones`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            if(!res.ok) throw new Error("Failed to create milestone");
            const addedMilestone = await res.json();
            setData(prev => [...prev, addedMilestone.milestone])
            setShowAddForm(false);
            alert("Milestone Created successfully");
            setFormData({
                title: '',
                date: '',
                note: ''
            })
        } catch (error) {
            console.log("Error:", error.message);
        } finally {
            setLoading(false);
        }
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="md:w-1/2 p-6 bg-gray-50 shadow-md rounded-xl flex flex-col gap-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Add Milestone</h2>

      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-medium text-gray-700">Title</label>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="title"
          name="title"
          placeholder="Add title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="mb-1 font-medium text-gray-700">Date</label>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="note" className="mb-1 font-medium text-gray-700">Note</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="note"
          name="note"
          placeholder="Optional note"
          value={formData.note}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled = {loading}
      >
        {loading ? "Saving..." : isEdit ? "Update Milestone" : "Add Milestone"}
      </button>
    </form>
  );
};

export default AddMilestoneForm;
