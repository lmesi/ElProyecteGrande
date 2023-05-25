import React from "react";
import ReactDOM from "react-dom/client";
import AdminPage from "./Pages/AdminPage";
import OrdersListPage from "./Pages/OrdersListPage";
import App from "./App";
import Companies from "./Pages/Companies";
import AddNewCompany from "./Pages/AddNewCompany";
import UpdateCompany from "./Pages/UpdateCompany";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrdersUpdatePage from "./Pages/OrderUpdatePage";
import AddNewOrder from "./Pages/AddNewOrder";
import AddUser from "./Pages/AddUser";
import Users from "./Pages/Users";
import UpdateUser from "./Pages/UpdateUser";
import DriverOrders from "./Pages/DriverOrders";
import WrongPage from "./Pages/WrongPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          {
            path: "/admin/companies",
            element: <Companies />,
          },
          {
            path: "/admin/companies/addnew",
            element: <AddNewCompany />,
          },
          {
            path: "/admin/companies/update/:id",
            element: <UpdateCompany />,
          },
          {
            path: "/admin/orders",
            element: <OrdersListPage />,
          },
          {
            path: "/admin/orders/addnew",
            element: <AddNewOrder />,
          },
          {
            path: "/admin/orders/update/:id",
            element: <OrdersUpdatePage />,
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
        ],
      },
      {
        path: `/driver/:id`,
        element: <DriverOrders />,
      },
      {
        path: "*",
        element: <WrongPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
