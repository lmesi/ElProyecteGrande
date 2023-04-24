import React from "react";
import { NavLink } from "react-router-dom";
import '../Navbar.css'
import { useState, useEffect } from "react";

export default function Navbar() {
    let listOfMenupoints = ["User", "Order", "Partner"];
    const [active, setActive] = React.useState("");


    const handleOpen = (menupoint) => {
        active === menupoint ?
            setActive("") :
            setActive(menupoint);
        console.log(active)
    };
    function Showmenu(menupoint) {
        return menupoint === active;
    }

    return (
        <div className="Navigation">
            <nav className="navbar">
                <NavLink to="/admin">
                    Home
                </NavLink>
                {listOfMenupoints.map(menupoint => (<div key={menupoint}><button onClick={e => handleOpen(menupoint)}>{menupoint}s</button>
                    {Showmenu(menupoint) ? (
                        <ul >
                            <li >
                                <NavLink to={`/admin/${menupoint.toLowerCase()}s`}>
                                    List all {menupoint.toLowerCase()}s
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to={`/admin/${menupoint.toLowerCase()}s/addnew`}>
                                    Add new {menupoint.toLowerCase()}
                                </NavLink>
                            </li>
                        </ul>
                    ) : null}</div>))}
            </nav >
        </div >
    );
}