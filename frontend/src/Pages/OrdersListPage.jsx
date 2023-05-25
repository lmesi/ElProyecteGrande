import React from "react";
import { useState, useEffect } from "react";
import Delete from "../Components/Delete";
import Filter from "../Components/Filter";

function OrdersListPage() {
    const [loading, setLoading] =useState(true)
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
    });

    async function fetchData() {
      await fetch("/api/Orders", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setFilteredData(json)
            })
          .then(setLoading(false))
            .catch((e) => console.log(e.message));
    }

    useEffect( () => {
        if (localStorage.getItem("role") === "1") {
            fetchData();
        } else {
            localStorage.clear();
            navigate("/");
        }
    }, [data.length]);

    const [open, setOpen] = useState(false);
    const [toDelete, setToDelete] = useState("");
    const handleClick = (id) => {
        setOpen(true);
        setToDelete(id);
    };
    const handleDialogClose = () => {
        setOpen(false);
        setToDelete("");
    };

    function fetchDelete() {
        fetch(`/api/orders/${toDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => console.log("deleted " + res.status))
            .catch((err) => console.log(err));
    }

    const handleConfirm = () => {
        fetchDelete();
        setToDelete("");
        setOpen(false);
        setData([]);
    };

    const handleFiltering = (e, columnNumber) => {
        setFilterOptions((prevState) => ({
            ...prevState,
            [columnNumber]: e.target.value,
        }));
    };

    useEffect(() => {
        let filtered = data;
        if (filterOptions[1] !== "") {
            filtered = filtered.filter(
                (order) => order.companyName === filterOptions[1]
            );
        }
        if (filterOptions[2] !== "") {
            filtered = filtered.filter(
                (order) => order.loadingAddress === filterOptions[2]
            );
        }
        if (filterOptions[3] !== "") {
            filtered = filtered.filter(
                (order) => order.unloadingAddress === filterOptions[3]
            );
        }
        if (filterOptions[4] !== "") {
            if (filterOptions[4] === "Finished") {
                filtered = filtered.filter((order) => order.unloadingDate !== null);
            }
            if (filterOptions[4] === "Not finished") {
                filtered = filtered.filter((order) => order.unloadingDate === null);
            }
        }
        if (filterOptions[5] !== "") {
            filtered = filtered.filter(
                (order) => order.userName === filterOptions[5]
            );
        }
        if (filterOptions[6] !== "") {
            filtered = filtered.filter(
                (order) => order.goodsName === filterOptions[6]
            );
        }
        setFilteredData(filtered);
    }, [data, filterOptions]);

    return (
        <div className="tableContainer">
            <div className="row justify-content-center">
                <h1 className="titles">Orders</h1>
                {!loading ? <div className="row justify-content-center">
                    <table className="table table-striped table-dark table-hover">
                        <thead className="tableHead">
                            <tr>
                                <th>Order Id</th>
                                <th>Company name <div><Filter whatToFilter={data.map(order => order.companyName).filter((x, i, a) => a.indexOf(x) === i)} onFilterSelect={e => handleFiltering(e, 1)} /></div></th>
                                <th>Loading place <div><Filter whatToFilter={data.map(order => order.loadingAddress).filter((x, i, a) => a.indexOf(x) === i)} onFilterSelect={e => handleFiltering(e, 2)} /></div></th>
                                <th>Unloading place<div><Filter whatToFilter={data.map(order => order.unloadingAddress).filter((x, i, a) => a.indexOf(x) === i)} onFilterSelect={e => handleFiltering(e, 3)} /></div></th>
                                <th>Unloading time<div><Filter whatToFilter={["Finished", "Not finished"]} onFilterSelect={e => handleFiltering(e, 4)} /></div></th>
                                <th>Driver<div><Filter whatToFilter={data.map(order => order.userName).filter((x, i, a) => a.indexOf(x) === i)} onFilterSelect={e => handleFiltering(e, 5)} /></div></th>
                                <th>Goods<div><Filter whatToFilter={data.map(order => order.goodsName).filter((x, i, a) => a.indexOf(x) === i)} onFilterSelect={e => handleFiltering(e, 6)} /></div></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(order => (<tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.companyName}</td>
                                <td>{order.loadingAddress}</td>
                                <td>{order.unloadingAddress}</td>
                                <td>{order.unloadingDate !== null ? order.unloadingDate.split("T")[0] : ""}</td>
                                <td>{order.userName}</td>
                                <td>{order.goodsName}</td>
                                <td><button className="editButton" onClick={() => { window.location.href = `/admin/orders/update/${order.id}`; }}>Edit</button></td>
                                <td><button className="deleteButton" onClick={e => handleClick(order.id)}>Delete</button></td>
                            </tr>))}
                        </tbody>
                    </table></div> : <h1>Loading...</h1>}
                {open ? <Delete
                    isOpen={open}
                    content={`Are you sure you want to delete order ${toDelete}?`}
                    onConfirm={handleConfirm}
                    onClose={handleDialogClose}
                /> : ""}
            </div>
        </div>
    );
}

export default OrdersListPage;
