import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateCompany() {

    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({});

    useEffect(() => {
        fetch("/api/Companies").then((res) => res.json())
            .then((res) => {
                setCompany(res.find(c => c.id == id));
            });
    }, [id])

    function handleNameChange(e) {
        setCompanyName(e.target.value);
    }

    function handleAddressChange(e) {
        setCompanyAddress(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();


        let updateCompany = {
            name: companyName,
            address: companyAddress,
            orderIds: []
        }

        if (companyName === "") {
            updateCompany.name = company.name;
        }

        if (companyAddress === "") {
            updateCompany.address = company.address;
        }

        fetch(`/api/Companies/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateCompany)
        }).then(response => {
            console.log(response);
        })
            .catch(error => console.error(error));

        setCompanyName("");
        setCompanyAddress("");
        navigate("/admin/companies");
    }

    return (
        <>
            <h1>Edit Company:</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Company name:
                    <input type="text" id="name" placeholder={Object.keys(company).length === 0 ? ""
                        : company.name} name="name" value={companyName} onChange={handleNameChange} />
                </label>
                <label>
                    Company Address:
                    <input type="text" id="address" placeholder={Object.keys(company).length === 0 ? ""
                        : company.address} name="address" value={companyAddress} onChange={handleAddressChange} />
                </label>
                <input type="submit" value="Edit Company" />
            </form>
        </>
    )
}
