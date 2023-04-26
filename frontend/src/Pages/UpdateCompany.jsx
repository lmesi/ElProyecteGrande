import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../Form.css';

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
        <div className="container">
            <div className="row justify-content-center">
                <div className="card card-custom">
                    <h1>Edit {Object.keys(company).length === 0 ? "..."
                        : company.name}:</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Company Name:
                                <input type="text" id="name" placeholder={Object.keys(company).length === 0 ? ""
                                    : company.name} name="name" value={companyName} onChange={handleNameChange} className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Company Address:
                                <input type="text" id="address" placeholder={Object.keys(company).length === 0 ? ""
                                    : company.address} name="address" value={companyAddress} onChange={handleAddressChange} className="form-control" />
                            </label>
                        </div>
                        <input type="submit" value="Edit Company" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </div>
    )
}
