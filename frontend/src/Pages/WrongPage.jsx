import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Button from "bootstrap/js/src/button.js";
import "../css/WrongPage.css"

function WrongPage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    };

    return (
        <div className="WrongPage">
            <h2>You are trying to reach a page, that doesn't exist, or you don't have the rights for it.</h2>
            <div>
                <button className="backButton" onClick={handleClick}>Back to Login</button>
            </div>
        </div>
    );
}

export default WrongPage;