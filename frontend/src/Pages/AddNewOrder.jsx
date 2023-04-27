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
        fetch("/api/Companies", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => setCompanyData(json))
            .catch((e) => console.log(e.message));
    }

    function fetchDrivers() {
        fetch("/api/driver", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => setDriverData(json))
            .catch((e) => console.log(e.message));
    }

    function fetchGoods() {
        fetch("/api/Goods", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => setGoodsData(json))
            .catch((e) => console.log(e.message));
    }

    useEffect(() => {
        if (localStorage.getItem("role") !== "1") {
            localStorage.clear();
            navigate("/");
        }

        fetchCompanies();
        fetchDrivers();
        fetchGoods();
    }, [goodsData.length]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("/api/Orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: goods,
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
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: goods,
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
    };

    return (
        <div className="container">
            {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0) ?
                <div className="row justify-content-center">
                    <div className="card card-custom">
                        <h1>Add New Order</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group justify-content-center d-flex">
                                <select className="form-select orderDropdown mx-auto" value={company} name="company" onChange={(e) => setCompany(e.target.value)}>
                                    <option value="" disabled >select company</option>
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
                            <div className="form-group justify-content-center d-flex">
                                <select className="form-select orderDropdown mx-auto" value={driver} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                                    <option value="" disabled hidden>select driver</option>
                                    {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group justify-content-center d-flex">
                                <select className="form-select orderDropdown mx-auto" value={goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                                    <option value="" disabled >select goods</option>
                                    {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                                </select>
                            </div>
                            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); setShow(true) }}>Add or delete goods</button>
                            <br></br>
                            <input type="submit" value="Submit" className={company && loadingPlace && unloadingPlace && driver && goods != "" ? "btn btn-primary" : "btn btn-primary disabled"} />
                        </form>
                    </div>
                </div>
                : <h1>Loading...</h1>}
            {message === "" ? "" : <p>{message}</p>}
            {show ?
                <div className="blackout">
                    <div className="popup">
                        <form className="form" onSubmit={handleAddGoodsSubmit}>
                            <div className="formElement">
                                <label>
                                    Add new goods:
                                    <input type="text" value={goods} onChange={(e) => setGoods(e.target.value)} />
                                </label>
                                <input type="submit" value="Submit" className="btn btn-primary deleteGoodsBtn" />
                                <label >
                                    Delete this record of goods:
                                    <select className="form-select" value={goods} name="Goods" onChange={(e) => setGoodsForDelete(e.target.value)}>
                                        <option value="" disabled selected hidden>select goods</option>
                                        {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                                    </select>
                                    <button className="btn btn-primary deleteGoodsBtn" onClick={(e) => { e.preventDefault(); deleteGoods(); }}>Delete</button>
                                </label>
                            </div>
                        </form>
                    </div>
                </div> : ""}
        </div>)
};
