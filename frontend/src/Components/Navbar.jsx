import React from "react";
import {NavLink} from "react-router-dom";
import '../css/Navbar.css'
import '../css/Pages.css';
import {useEffect} from "react";
import {useRef} from "react";
import {useState} from "react";

export default function Navbar() {
    let listOfMenupoints = ["User", "Order", "Company"]; //CHANGE PARTENR TO COMPANY
    const [active, setActive] = React.useState("");
    const [openMenu, setOpenMenu] = useState('');
    const menuRef = useRef(null);

    const handleOpen = (menupoint) => {
        active === menupoint ?
            setActive("") :
            setActive(menupoint);
        setOpenMenu(menupoint);
        console.log(active)
    };

    function Showmenu(menupoint) {
        return openMenu === menupoint;
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu('');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <NavLink onClick={() => localStorage.clear()} className="nav-link navHomeButton" to="/">
                    Logout
                </NavLink>
                <NavLink className="nav-link navHomeButton" to="/admin">
                    Home
                </NavLink>
                <div className="menu" ref={menuRef}>
                    {listOfMenupoints.map(menupoint => (<div className="navContainer" key={menupoint}>
                        <button className="navbutton"
                                onClick={e => handleOpen(menupoint)}>{menupoint === "Company" ? "Companies" : `${menupoint}s`}</button>
                        {Showmenu(menupoint) ? (
                            <ul className="dropdown">
                                <li>
                                    <NavLink className="nav-link"
                                             to={menupoint === "Company" ? "/admin/companies" : `/admin/${menupoint.toLowerCase()}s`}>
                                        List all {menupoint === "Company" ? "companie" : menupoint.toLowerCase()}s
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link"
                                             to={menupoint === "Company" ? "/admin/companies/addnew" : `/admin/${menupoint.toLowerCase()}s/addnew`}>
                                        Add new {menupoint === "Company" ? "companie" : menupoint.toLowerCase()}s
                                    </NavLink>
                                </li>
                            </ul>
                        ) : null}</div>))}
                </div>
            </nav>
            <p>Actual user: {localStorage.getItem("username")}</p>
        </div>
    );
}