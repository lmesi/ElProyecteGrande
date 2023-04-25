import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Companies from './Pages/Companies';
import AddNewCompany from './Pages/AddNewCompany';
import UpdateCompany from './Pages/UpdateCompany';

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children:
    [
      {
        path: "",
        element: <App />
      },
      {
        path: "admin/companies",
        element: <Companies />
      },
      {
        path: "admin/companies/addnew",
        element: <AddNewCompany />
      },
      {
        path: "admin/companies/update/:id",
        element: <UpdateCompany />
      },
    ]
}])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
