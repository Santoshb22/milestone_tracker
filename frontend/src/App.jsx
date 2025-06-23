import React from 'react'
import { Routes, Route } from "react-router";
import Header from './components/Header/Header';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import AuthLayout from './pages/AuthLayout';
import Milestones from './pages/Milestones';

const App = () => {
 
  return (
    <>
    <Header />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path='/' element = {<Milestones/>} />
    </Routes>
    </>
  )
}

export default App