import { useState } from "react";

export default function AddNewCompany() {

    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");

    function handleNameChange(e) {
        setCompanyName(e.target.value);
    }

    function handleAddressChange(e) {
        setCompanyAddress(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const company = {
            name: companyName,
            address: companyAddress,
            orderIds: []
        }

        fetch('/api/Companies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(company)
        }).then(response => {
            console.log(response);
        })
            .catch(error => console.error(error));

        setCompanyAddress("");
        setCompanyName("");
    }

    return (
        <>
            <h1>Add New Company:</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Company name:
                    <input type="text" id="name" name="name" value={companyName} onChange={handleNameChange} />
                </label>
                <label>
                    Company Address:
                    <input type="text" id="address" name="address" value={companyAddress} onChange={handleAddressChange} />
                </label>
                <input type="submit" value="Add Company" />
            </form>
        </>
    )
}
