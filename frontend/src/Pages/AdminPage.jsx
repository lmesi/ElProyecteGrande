import Navbar from "../Components/Navbar"
import { Outlet } from "react-router-dom"

function AdminPage() {

  return (
    <div className="AdminPage">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AdminPage