import Navbar from "./Components/Navbar"
import { Outlet } from "react-router-dom"
import logo from './assets/Speedy Gonzales Transport.svg';

function AdminPage() {

  return (
    <div className="AdminPage App">
      <Navbar />
      <Outlet />
      {location.pathname === '/admin' && (
        <div className="logoContainer">
          <img src={logo} alt="Logo" />
        </div>
      )}
    </div>
  )
}

export default AdminPage