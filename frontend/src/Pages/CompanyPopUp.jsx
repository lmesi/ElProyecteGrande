import React from "react";
import '../App.css'

export default function CompanyPopUp({ setShowPopup, companyToDelete, setCompanies }) {

    function handleCancel() {
        setShowPopup(false);
    }

    function handleDelete() {
        setShowPopup(false);

        fetch(`/api/Companies/${companyToDelete.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            fetch("/api/Companies")
                .then((response) => response.json())
                .then((data) => setCompanies(data))
                .catch((error) => console.log(error));
        })
            .catch(error => console.error(error));
    }

    return (
        <div className="popup">
            <h3>Would You like to delete the company named "{companyToDelete.name}"?</h3>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}
