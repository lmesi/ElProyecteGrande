import React from "react";
import { useState, useEffect } from "react";
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
    const [show, setShow] = useState(false);
    function fetchCompanies() {
        fetch("/api/Companies")
            .then((response) => response.json())
            .then((json) => setCompanyData(json)).catch(e => console.log(e.message));;
    }
    function fetchDrivers() {
        fetch("/api/driver")
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
    }, [goodsData.length]);

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
                    userId: driver,
                    goodsId: goods,
                }),
            });
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
    let handleAddGoodsSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch("/api/Goods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: goods
                }),
            });
            if (res.status === 200) {
                setGoods("");
            }
        } catch (err) {
            console.log(err);
        }
        setShow(false);
        setGoodsData([]);
    };
    let deleteGoods = async () => {
        try {
            let res = await fetch(`/api/Goods/${goods}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: goods
                }),
            });
            if (res.status === 200) {

            }
        } catch (err) {
            console.log(err);
        }
        setGoodsData([]);
        setShow(false);
    };
    const setGoodsForDelete = (toDelete) => {
        setGoods(toDelete);
    }
    return (
        <div className="container">
            {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0) ?
                <div className="row justify-content-center">
                    <div className="card card-custom">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="formElement">
                                <select defaultValue={company} name="company" onChange={(e) => setCompany(e.target.value)}>
                                    <option value="" disabled selected hidden>select company</option>
                                    {companyData.map(company => (<option key={`company${company.id}`} value={company.id} >{company.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    Loading address:
                                    <input type="text" className="form-control" value={loadingPlace} onChange={(e) => setLoadingPlace(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Unloading address:
                                    <input type="text" className="form-control" value={unloadingPlace} onChange={(e) => setUnloadingPlace(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <select defaultValue={driver} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                                    <option value="" disabled selected hidden>select driver</option>
                                    {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <select value={goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                                    <option value="" disabled selected hidden>select goods</option>
                                    {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                                </select>
                                <button onClick={(e) => { e.preventDefault(); setShow(true) }}>Add or delete goods</button>
                            </div>
                            <input type="submit" value="Submit" className={company && loadingPlace && unloadingPlace && driver && goods != "" ? "btn btn-primary" : "btn btn-primary disabled"} />
                        </form>
                    </div>
                </div>
                : <h1>Loading...</h1>}
            {message === "" ? "" : <p>{message}</p>}
            {show ?
                <div className="popup">
                    <form className="form" onSubmit={handleAddGoodsSubmit}>
                        <div className="formElement">
                            <label>
                                Add new goods:
                                <input type="text" value={goods} onChange={(e) => setGoods(e.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                            <label>
                                Delete this record of goods:
                                <select value={goods} name="Goods" onChange={(e) => setGoodsForDelete(e.target.value)}>
                                    <option value="" disabled selected hidden>select goods</option>
                                    {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                                </select>
                                <button onClick={(e) => { e.preventDefault(); deleteGoods(); }}>X</button>
                            </label>
                        </div>
                    </form>
                </div> : ""}

        </div>
    )
}