import { useState } from "react";
import '../Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container">
            <div className="row justify-content-center">
                <div className="card card-custom">
                    <h1>Add New Company:</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Company Name:
                                <input type="text" id="name" className="form-control" name="name" value={companyName} onChange={handleNameChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Company Address:
                                <input type="text" id="address" className="form-control" name="address" value={companyAddress} onChange={handleAddressChange} />
                            </label>
                        </div>
                        <input type="submit" value="Add Company"
                            className={companyName && companyAddress != "" ? "btn btn-primary" : "btn btn-primary disabled"} />
                    </form>
                </div>
            </div>
        </div >
    )
}
