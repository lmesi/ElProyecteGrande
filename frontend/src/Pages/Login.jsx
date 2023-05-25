import React, {useEffect, useState} from "react";
import {redirect, useNavigate} from "react-router-dom";

const fetchLogin = async (username, password, setToken) => {
    await fetch("/api/Login/authenticate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: username, password: password}),
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            localStorage.setItem("id", data.id);
            localStorage.setItem("token", data.token);
            //setToken(localStorage.getItem("token"));
        });

};
const Login = (
    {
        /* setToken */
    }
) => {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [activeLogin, setActiveLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(name);
        console.log(password);
        setAttempts(attempts + 1)
        try {
            await fetchLogin(name, password, navigate, message, setMessage /* , setToken */);
            // setMessage(localStorage.getItem("message"))
            localStorage.getItem("role") === "1"
                ? navigate("/admin")
                : localStorage.getItem("role") === "0" ? navigate(`/driver/${localStorage.getItem("id")}`) : setMessage("Login failed. Please try again");
        } catch (e) {
            setMessage("Login failed")
        }
    };
    useEffect(() => {
        localStorage.clear();
        setName("");
        setPassword("");
        console.log(attempts);

        if (attempts > 4) {
            setActiveLogin(false);
            const timer = setTimeout(() => {setActiveLogin(true); setAttempts(0); setMessage("");}, 10000);
            return () => clearTimeout(timer);
        }
    }, [attempts]);

    return (
        <div>
            {activeLogin ?
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
                    {message ?
                        <div><h3>{message}</h3><br/><p>You have {5 - attempts} {attempts<=3? "attempts": "attempt"} left</p></div> : ""}
                </div>
                : <h3>Too many wrong attempts! Try later.</h3>}
                </div>
                );
            };

export default Login;
