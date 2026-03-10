import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader/Loader";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(() => localStorage.getItem("tkn"));
  const [userId, setuserId] = useState(null);

  function setAuthenticatedUser(tkn) {
    setuserToken(tkn);
  }

  function clearUserToken() {
    setuserToken(null);
  }

  // decode token
  useEffect(() => {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      setuserId(decodedToken.user);
    }
  }, [userToken]);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const res = await axios.get(
        `https://route-posts.routemisr.com/users/profile-data`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      );
      return res.data.data.user; // نرجع مباشرة user
    },
    enabled: !!userToken,
  });

  if (isLoading) return <Loader />;
  if (isError) return <h2>Error</h2>;

  return (
    <authContext.Provider
      value={{
        userToken,
        setAuthenticatedUser,
        clearUserToken,
        userId,
        userData,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
