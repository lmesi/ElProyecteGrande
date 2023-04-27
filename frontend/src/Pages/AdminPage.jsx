import Navbar from "../Components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== "1") {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="AdminPage">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AdminPage;
