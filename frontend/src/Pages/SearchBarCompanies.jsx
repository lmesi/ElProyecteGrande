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
        <div>
            <label>Search:
                <input onChange={handleInputChange} type="text" />
            </label>
            <label>
                By Name:
                <input type="radio" value="name" checked={option === "name"}
                    onChange={handleOptionChange} />
            </label>
            <label>
                By Address:
                <input type="radio" value="address" checked={option === "address"}
                    onChange={handleOptionChange} />
            </label>
        </div>
    )
}
