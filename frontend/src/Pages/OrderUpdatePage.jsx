import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddOrDeleteGoods from "../Components/AddOrDelGoods";
import FormForOrders from "../Components/FormForOrders";
export default function OrdersUpdatePage() {
    const id = useParams().id;
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [company, setCompany] = useState("");
    const [loadingPlace, setLoadingPlace] = useState("");
    const [unloadingPlace, setUnloadingPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [goods, setGoods] = useState("");
    const [show, setShow] = useState(false);

    function fetchData() {
        fetch(`/api/Orders/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((e) => console.log(e.message));
    }

    useEffect(() => {
        if (localStorage.getItem("role") == "1") {
            fetchData();
        } else {
            localStorage.clear();
            navigate("/");
        }
    }, [data.length]);

    const [companyData, setCompanyData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [goodsData, setGoodsData] = useState([]);

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
        fetchCompanies();
        fetchDrivers();
        fetchGoods();
    }, [goodsData.length]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        let datas = {
            companyId: company === data.company ? "" : company,
            loadingAddress: loadingPlace === data.loqadingPlace ? "" : loadingPlace,
            unloadingAddress:
                unloadingPlace === data.unloadingPlace ? "" : unloadingPlace,
            userId: driver === data.user ? "" : driver,
            goodsId: goods === data.goods ? "" : goods,
        };
        let dataToFetch = {};
        Object.entries(datas).map((pair) =>
            pair[1] !== "" ? (dataToFetch[pair[0]] = pair[1]) : ""
        );

        try {
            let res = await fetch(`/api/Orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card card-custom">
                    <h1>Edit order number {id}</h1>
                    {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0 && data.id !== undefined) ?
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
                        : <h1>Loading...</h1>}
                    {message === "" ? "" : <p>{message}</p>}
                    {show ?
                        <AddOrDeleteGoods
                            setGoods={setGoods}
                            goodsData={goodsData}
                            goods={goods}
                            setGoodsData={setGoodsData}
                            setShow={setShow} />
                        : ""}
                </div>
            </div>
        </div>
    );
}
