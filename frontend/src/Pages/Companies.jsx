import React, { useEffect, useState } from "react";
import CompanyPopUp from './CompanyPopUp';
import { Link } from 'react-router-dom';
import '../App.css'
import SearchBarCompanies from "./SearchBarCompanies";

export default function Companies() {

    const [companies, setCompanies] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState({});
    const [sortDirectionByName, setSortDirectionByName] = useState("");
    const [sortDirectionByAddress, setSortDirectionByAddress] = useState("");
    const [companiesToShow, setCompaniesToShow] = useState([]);

    useEffect(() => {
        fetch("/api/Companies").then((res) => res.json())
            .then(res => {
                setCompanies(res);
                setCompaniesToShow(res);
            });
    }, [])

    function handlePopUp(company) {
        setShowPopup(true);
        setCompanyToDelete(company);
    }

    function handleSortClickByName() {
        if (sortDirectionByName === 'asc') {
            setSortDirectionByName('desc');
            const toSort = [...companies];
            setCompaniesToShow(toSort.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
            setSortDirectionByName('asc');
            const toSort = [...companies];
            setCompaniesToShow(toSort.sort((a, b) => b.name.localeCompare(a.name)));
        }
    };

    function handleSortClickByAddress() {
        if (sortDirectionByAddress === 'asc') {
            setSortDirectionByAddress('desc');
            const toSort = [...companies];
            setCompaniesToShow(toSort.sort((a, b) => a.address.localeCompare(b.address)));
        } else {
            setSortDirectionByAddress('asc');
            const toSort = [...companies];
            setCompaniesToShow(toSort.sort((a, b) => b.address.localeCompare(a.address)));
        }
    };

    return (
        <>
            {companies.length < 1 ? <h3>Loading...</h3> :
                <div>
                    <SearchBarCompanies companies={companies} setCompaniesToShow={setCompaniesToShow} />
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <button type="button" onClick={handleSortClickByName}>
                                            Name {sortDirectionByName === 'asc' ? '▲' : '▼'}
                                        </button>
                                    </th>
                                    <th>
                                        <button type="button" onClick={handleSortClickByAddress}>
                                            Address {sortDirectionByAddress === 'asc' ? '▲' : '▼'}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.length < 1 ? <></> : companiesToShow.map((company) => {
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
                    </div>
                    {showPopup ? <CompanyPopUp setCompanies={setCompanies}
                        companyToDelete={companyToDelete} setShowPopup={setShowPopup}
                        setCompaniesToShow={setCompaniesToShow} /> : <></>}
                </div>
            }
        </>
    )
}
