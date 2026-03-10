import React, { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { userToken } = useContext(authContext);
  if (userToken === null) {
    return <Navigate to={"/auth"} />;
  }
  return <>{children}</>;
}
