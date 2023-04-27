import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrdersUpdatePage() {
    const id = useParams().id
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [company, setCompany] = useState("");
    const [loadingPlace, setLoadingPlace] = useState("");
    const [unloadingPlace, setUnloadingPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [goods, setGoods] = useState("");
    const [show, setShow] = useState(false);
    function fetchData() {
        fetch(`/api/Orders/${id}`)
            .then((response) => response.json())
            .then((json) => setData(json)).catch(e => console.log(e.message));;
    }
    useEffect(() => {
        fetchData();
    }, [data.length]);

    const [companyData, setCompanyData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [goodsData, setGoodsData] = useState([]);

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
        let datas = {
            companyId: company === data.company ? "" : company,
            loadingAddress: loadingPlace === data.loqadingPlace ? "" : loadingPlace,
            unloadingAddress: unloadingPlace === data.unloadingPlace ? "" : unloadingPlace,
            userId: driver === data.user ? "" : driver,
            goodsId: goods === data.goods ? "" : goods,
        }
        let dataToFetch = {};
        Object.entries(datas).map(pair => pair[1] !== "" ? dataToFetch[pair[0]] = pair[1] : '')
        try {
            let res = await fetch(`/api/Orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dataToFetch),
            });
            if (res.status === 200) {
                setCompany("");
                setLoadingPlace("");
                setUnloadingPlace("");
                setDriver("");
                setGoods("");
                setMessage("data created successfully");
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
            <div className="row justify-content-center">
                <div className="card card-custom">
                    <h1>Edit order number {id}</h1>
                    {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0 && data.id !== undefined) ?
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <select value={data.company} name="company" onChange={(e) => setCompany(e.target.value)}>
                                    <option value="" disabled >select company</option>
                                    {companyData.map(company => (<option key={`company${company.id}`} value={company.id} >{company.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    Loading address:
                                    <input className="form-control" type="text" value={data.loadingPlace} onChange={(e) => setLoadingPlace(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Unloading address:
                                    <input className="form-control" type="text" value={data.unloadingPlace} onChange={(e) => setUnloadingPlace(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <select value={data.user} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                                    <option value="" disabled >select driver</option>
                                    {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <select value={data.goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                                    <option value="" disabled >select goods</option>
                                    {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name}</option>))}
                                </select>
                                <button onClick={(e) => { e.preventDefault(); setShow(true) }}>Add or delete goods</button>
                            </div>
                            <input className="btn btn-primary" type="submit" value="Submit" />

                        </form>
                        : <h1>Loading...</h1>}
                    {message === "" ? "" : <p>{message}</p>}
                    {show ?
                        <div>
                            <form className="form" onSubmit={handleAddGoodsSubmit}>
                                <div className="formElement">
                                    <label>
                                        Add new goods:
                                        <input className="form-control" type="text" value={goods} onChange={(e) => setGoods(e.target.value)} />
                                    </label>
                                    <input className="btn btn-primary" type="submit" value="Submit" />
                                    <label>
                                        Delete this record of goods:
                                        <select value={goods} name="Goods" onChange={(e) => setGoodsForDelete(e.target.value)}>
                                            <option value="" disabled selected hidden>select goods</option>
                                            {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                                        </select>
                                        <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); deleteGoods(); }}>Delete</button>
                                    </label>
                                </div>
                            </form>
                        </div> : ""}
                </div>
            </div>
        </div>
    );
}