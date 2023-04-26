import React from "react";
import { useState } from "react";

export default function SearchBarCompanies({ companies, setCompaniesToShow }) {

    const [option, setOption] = useState("name");

    function handleInputChange(e) {
        if (option == "name") {
            const toFilter = [...companies];
            setCompaniesToShow(toFilter.filter(c => c.name.toLowerCase().includes(e.target.value.toLowerCase())));
        } else {
            const toFilter = [...companies];
            setCompaniesToShow(toFilter.filter(c => c.address.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    function handleOptionChange(e) {
        setOption(e.target.value);
    }

    return (
        <div className="row justify-content-center">
            <div className="searchBar">
                <label className="searchBar-flex-item">Search:
                    <input onChange={handleInputChange} type="text" className="searchBar-flex-item searchField" />
                </label>
                <label className="optionLabel searchBar-flex-item">
                    By Name:
                    <input type="radio" value="name" className="searchBar-flex-item" checked={option === "name"}
                        onChange={handleOptionChange} />
                </label>
                <label className="optionLabel searchBar-flex-item">
                    By Address:
                    <input type="radio" value="address" className="searchBar-flex-item" checked={option === "address"}
                        onChange={handleOptionChange} />
                </label>
            </div>
        </div>
    )
}
