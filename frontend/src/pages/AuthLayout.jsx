import React from 'react';
import authImg from '../assets/auth-img.jpg';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[80%] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img src={authImg} alt="Auth" className="h-full w-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
