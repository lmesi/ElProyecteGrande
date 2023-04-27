import React from "react";
import { useState, useEffect } from "react";
import FormForOrders from "../Components/FormForOrders";
import AddOrDeleteGoods from "../Components/AddOrDelGoods";
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

    return (
        <div className="container">
            {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0) ?
                <div className="row justify-content-center">
                    <div className="card card-custom">
                        <h1>Add New Order</h1>
                        <FormForOrders
                            handleSubmit={handleSubmit}
                            companyData={companyData}
                            company={company}
                            loadingPlace={loadingPlace}
                            unloadingPlace={unloadingPlace}
                            driver={driver}
                            goods={goods}
                            driverData={driverData}
                            setCompany={setCompany}
                            setDriver={setDriver}
                            setLoadingPlace={setLoadingPlace}
                            setUnloadingPlace={setUnloadingPlace}
                            goodsData={goodsData}
                            setGoods={setGoods}
                            setShow={setShow}
                        />
                    </div>
                </div>
                : <h1>Loading...</h1>}
            {message === "" ? "" : <p>{message}</p>}
            {show ?
                <AddOrDeleteGoods
                    setGoods={setGoods}
                    goodsData={goodsData}
                    goods={goods}
                    setGoodsData={setGoodsData}
                    setShow={setShow} /> : ""}
        </div>)
};
