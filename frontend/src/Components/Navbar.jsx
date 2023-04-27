import React from "react";
import { NavLink } from "react-router-dom";
import '../Navbar.css'

export default function Navbar() {
    let listOfMenupoints = ["User", "Order", "Company"]; //CHANGE PARTENR TO COMPANY
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
        <nav className="navbar">
            <NavLink class="nav-link" to="/admin">
                Home
            </NavLink>
            <div className="menu">
                {listOfMenupoints.map(menupoint => (<div key={menupoint}><button className="navbutton" onClick={e => handleOpen(menupoint)}>{menupoint === "Company" ? "Companies" : `${menupoint}s`}</button>
                    {Showmenu(menupoint) ? (
                        <ul class="dropdown" >
                            <li >
                                <NavLink class="nav-link" to={menupoint === "Company" ? "/admin/companies" : `/admin/${menupoint.toLowerCase()}s`}>
                                    List all {menupoint === "Company" ? "companie" : menupoint.toLowerCase()}s
                                </NavLink>
                            </li>
                            <li >
                                <NavLink class="nav-link" to={menupoint === "Company" ? "/admin/companies/addnew" : `/admin/${menupoint.toLowerCase()}s/addnew`}>
                                    Add new {menupoint === "Company" ? "companie" : menupoint.toLowerCase()}s
                                </NavLink>
                            </li>
                        </ul>
                    ) : null}</div>))}
            </div >
        </nav >
    );
}