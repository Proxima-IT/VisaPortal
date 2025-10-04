import React from "react";
import Navbar from "../Navbar/Navbar";
import Homepage from "../Home/Homepage";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Mainlayout;
