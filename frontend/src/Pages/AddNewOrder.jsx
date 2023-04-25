import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar"
export default function AddNewOrder() {
    const [companyData, setCompanyData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [goodsData, setGoodsData] = useState([]);

    const [company, setCompany] = useState("");
    const [loadingPlace, setLoadingPlace] = useState("");
    const [unloadingPlace, setUnloadingPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [goods, setGoods] = useState("");

    const [message, setMessage] = useState("");

    function fetchCompanies() {
        fetch("/api/Companies")
            .then((response) => response.json())
            .then((json) => setCompanyData(json)).catch(e => console.log(e.message));;
    }
    function fetchDrivers() {
        fetch("/api/users/driver")
            .then((response) => response.json())
            .then((json) => setDriverData(json)).catch(e => console.log(e.message));;
    }
    function fetchGoods() {
        fetch("/api/Goods")
            .then((response) => response.json())
            .then((json) => setGoodsData(json)).catch(e => console.log(e.message));;
    }
    useEffect(() => {
        fetchCompanies();
        fetchDrivers();
        fetchGoods();
    }, []);

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log("company " + company);
        console.log(loadingPlace);
        console.log(unloadingPlace);
        console.log("driver: " + driver)
        console.log("goods: " + goods);

        try {
            let res = await fetch("/api/Orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    companyId: company,
                    loadingAddress: loadingPlace,
                    unloadingAddress: unloadingPlace,
                    driverId: driver,
                    goodsId: goods,
                }),
            });
            // let resJson = await res.json();
            if (res.status === 200) {
                setCompany("");
                setLoadingPlace("");
                setUnloadingPlace("");
                setDriver("");
                setGoods("");
                setMessage("Order created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <Navbar />
            {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0) ?
                <form onSubmit={handleSubmit}>
                    <select defaultValue={company} name="company" onChange={(e) => setCompany(e.target.value)}>
                        <option value="" disabled selected hidden>select company</option>
                        {companyData.map(company => (<option key={`company${company.id}`} value={company.id} >{company.name}</option>))}
                    </select>
                    <label>
                        Loading address:
                        <input type="text" value={loadingPlace} onChange={(e) => setLoadingPlace(e.target.value)} />
                    </label>
                    <label>
                        Unloading address:
                        <input type="text" value={unloadingPlace} onChange={(e) => setUnloadingPlace(e.target.value)} />
                    </label>
                    <select defaultValue={driver} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                        <option value="" disabled selected hidden>select driver</option>
                        {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                    </select>
                    <select value={goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                        <option value="" disabled selected hidden>select goods</option>
                        {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name}</option>))}
                    </select>
                    <input type="submit" value="Submit" />

                </form>
                : <h1>Loading...</h1>}
            {message === "" ? "" : <p>{message}</p>}


        </div>
    )
}