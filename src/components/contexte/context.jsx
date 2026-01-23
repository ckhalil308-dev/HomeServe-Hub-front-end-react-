
import React, { useState, useEffect, createContext, useContext } from 'react';
import { GetMe } from '../../../api/Users.api';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

 const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await GetMe();
      setUser(userData); 
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    
    <UserContext.Provider value={{ user, setUser, loading ,fetchUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);