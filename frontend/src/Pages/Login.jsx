import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const fetchLogin = (username, password, navigate, setToken) => {
  fetch("/api/Login/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      localStorage.setItem("token", data.token);

      //setToken(localStorage.getItem("token"));

      localStorage.getItem("role") == "1"
        ? navigate("/admin")
        : navigate(`/driver/${localStorage.getItem("id")}`);
    });
};
const Login = (
  {
    /* setToken */
  }
) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(name);
    console.log(password);
    fetchLogin(name, password, navigate /* , setToken */);
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        id="username"
        className="form-control"
        placeholder="Username"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        id="password"
        className="form-control"
        placeholder="Password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="deleteButtonForPopUp" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
