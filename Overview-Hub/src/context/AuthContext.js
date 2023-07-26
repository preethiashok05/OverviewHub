import React, { createContext, useState } from 'react';
//import { clearUserSession } from '../utils/SessionManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setisAdmin] = useState(false);

  const login = (username , isAdmin) => {
    localStorage.setItem('username', username);
    localStorage.setItem('isAdmin', isAdmin);
    setIsLoggedIn(true);
    setisAdmin(isAdmin);
    setUsername(username);
  };

  const logout = () => {
    //clearUserSession();
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUsername('');
    setisAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username,isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
