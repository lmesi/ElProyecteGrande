import "./css/App.css";
import { Outlet } from "react-router-dom";
import logo from "./assets/Speedy Gonzales Transport.svg";
import { useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import { useState } from "react";

function App() {
  const location = useLocation();
  // const [token, setToken] = useState("");

  return (
    <div className="App">
      <Outlet />
      {location.pathname === "/" && (
        <div className="logoContainer">
          <Login /* setToken={setToken} */ />
          <img src={logo} alt="Logo" />
        </div>
      )}
      {location.pathname === "/admin" && (
        <div className="logoContainer">
          <img src={logo} alt="Logo" />
        </div>
      )}
    </div>
  );
}

export default App;
