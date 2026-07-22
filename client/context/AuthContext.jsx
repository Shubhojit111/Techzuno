"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const getAuth = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });

      setUser(data.user);
      console.log(data.user);
    } 
    catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      setUser(null);
    } 
    finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        getAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

