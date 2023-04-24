import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminPage from './AdminPage'
import OrdersListPage from './Pages/OrdersListPage'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import OrdersUpdatePage from './Pages/OrderUpdatePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/admin/orders",
    element: <OrdersListPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);