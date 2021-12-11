import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../constants";

const userContext = createContext({
  isLoggedIn: false,
  user: {
    userId: null,
    emailId: null,
    firstName: null,
    lastName: null,
  },
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const useUserContext = () => {
  return useContext(userContext);
};

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const verifyUserAuth = async () => {
    try {
      const res = await axios.get(API.USER.VERIFY_AUTH);
      const { success, data } = res.data;
      if (success) {
        setUser(data);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
      console.error(err);
    }
  };

  useEffect(() => {
    verifyUserAuth();
  }, []);

  const initialValue = {
    isLoggedIn,
    user,
    setIsLoggedIn,
    setUser,
  };

  return (
    <userContext.Provider value={initialValue}>{children}</userContext.Provider>
  );
};
