import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

export default function Layout() {
  const { userToken } = useContext(authContext);
  return (
    <>
      {userToken && <Navbar />}
      <Outlet />
    </>
  );
}
