import React, { useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const storeduser = localStorage.getItem("user");
    return storeduser? JSON.parse(storeduser) : null;
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  })

  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);
    setToken(token);  
  }


  const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      window.location.reload();
  }

  const value = {
    user,
    token,
    authStatus: !!user && !!token,
    login, 
    logout
  }

  return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}