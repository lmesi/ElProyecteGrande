import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Companies from "./Pages/Companies";
import AddNewCompany from "./Pages/AddNewCompany";
import UpdateCompany from "./Pages/UpdateCompany";
import AddUser from "./Pages/AddUser";
import Users from "./Pages/Users";
import UpdateUser from "./Pages/UpdateUser";
import DriverOrders from "./Pages/DriverOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "admin/companies",
        element: <Companies />,
      },
      {
        path: "admin/companies/addnew",
        element: <AddNewCompany />,
      },
      {
        path: "admin/companies/update/:id",
        element: <UpdateCompany />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/addnew",
        element: <AddUser />,
      },
      {
        path: "/admin/users/update/:id",
        element: <UpdateUser />,
      },
      {
        path: "/driver/:id",
        element: <DriverOrders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
