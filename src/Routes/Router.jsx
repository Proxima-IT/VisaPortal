import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Home/Homepage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ApplicationForm from "../VisaApplyForm/ApplicationForm";
import Mainlayout from "../layout/Mainlayout";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/apply-form",
        element: <ApplicationForm></ApplicationForm>,
      },
    ],
  },
]);

export default Router;
