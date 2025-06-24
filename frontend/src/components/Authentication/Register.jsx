import React, { useState } from 'react';
import { validateAuthForm } from '../../utils/validateForm';
import Button from './Button';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

 const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateAuthForm(formData);

    if(Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      })
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      setFormData({
        username: "",
        email: "",
        password: ""
    })

    setError({})
    } catch (error) {
      setError({general: error.message});
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
    onSubmit={handleFormSubmit}
    className="w-full max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

      <div className="flex flex-col">
        <label htmlFor="username" className="mb-1 text-gray-700 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.username}
          onChange={handleChange}
        />
        <div>
          {
            error.username && <p className='text-red-600 text-md font-semibold'>{error.username}</p>
          }
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
        <div>
          {
            error.email && <p className='text-red-600 text-md font-semibold'>{error.email}</p>
          }
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          {
            error.username && <p className='text-red-600 text-md font-semibold'>{error.password}</p>
          }
        </div>
      </div>

      <div>
        <Button text = {loading? "Loading..." : "Register"} disabled = {loading}/>
      </div>
    </form>
  );
};

export default Register;
