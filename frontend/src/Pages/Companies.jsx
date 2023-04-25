import React, { useEffect, useState } from "react";
import CompanyPopUp from './CompanyPopUp';
import { Link } from 'react-router-dom';
import '../App.css'

export default function Companies() {

    const [companies, setCompanies] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState({});

    useEffect(() => {
        fetch("/api/Companies").then((res) => res.json())
            .then(res => setCompanies(res));
    }, [])

    function handlePopUp(company) {
        setShowPopup(true);
        setCompanyToDelete(company);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length < 1 ? <></> : companies.map((company) => {
                        return (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.address}</td>
                                <td>
                                    <Link to={`/admin/companies/update/${company.id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handlePopUp(company)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {showPopup ? <CompanyPopUp setCompanies={setCompanies} companyToDelete={companyToDelete} setShowPopup={setShowPopup} /> : <></>}
        </div>
    )
}
