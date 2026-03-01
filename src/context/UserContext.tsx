"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import api from "@/lib/axios";

type UserContextType = {
  isLogin: boolean | null;
  checkLogin: () => void;
  setIsLogin: (v: boolean) => void;
};

const UserContext = createContext<UserContextType>({
  isLogin: null,
  checkLogin: () => {},
  setIsLogin: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const checkLogin = async () => {
    try {
      const res = await api.get(`/api/auth/me`);
      setIsLogin(!!res.data);
    } catch (err: any) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, checkLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
