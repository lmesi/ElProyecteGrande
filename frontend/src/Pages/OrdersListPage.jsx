import React from "react";
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderUpdatePage from "./OrderUpdatePage"
import Delete from "../Components/Delete";

function OrdersListPage() {
    const [data, setData] = useState([]);
    function fetchData() {
        fetch("/api/Orders")
            .then((response) => response.json())
            .then((json) => setData(json)).catch(e => console.log(e.message));;
    }
    useEffect(() => {
        fetchData();
    }, [data.length]);

    const [open, setOpen] = useState(false);
    const [toDelete, setToDelete] = useState("");
    const handleClick = (id) => {
        setOpen(true);
        setToDelete(id);
    };
    const handleDialogClose = () => {
        setOpen(false);
        setToDelete('');
    }
    function fetchDelete() {
        fetch(`/api/orders/${toDelete}`, {
            method: 'DELETE'
        })
            .then(res =>
                console.log("deleted " + res.status)
            )
            .catch(err => console.log(err));
    }
    const handleConfirm = () => {
        fetchDelete();
        setToDelete('');
        setOpen(false);
        setData([]);
    };
    return (
        <div className="OrdersListPage">
            <Navbar />
            <h1>Orders</h1>
            {data.length > 0 ? <div>
                <table className="listingTable">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Company name</th>
                            <th>Loading place</th>
                            <th>Unloading place</th>
                            <th>Unloading time</th>
                            <th>Driver</th>
                            <th>Goods</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(order => (<tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.companyName}</td>
                            <td>{order.loadingAddress}</td>
                            <td>{order.unloadingAddress}</td>
                            <td>{order.unloadingDate !== null ? order.unloadingDate.split("T")[0] : ""}</td>
                            <td>{order.driverName}</td>
                            <td>{order.goodsName}</td>
                            <td><button onClick={() => { window.location.href = `/admin/orders/update/${order.id}`; }}>Edit</button></td>
                            <td><button onClick={e => handleClick(order.id)}>Delete</button></td>
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
    )
}

export default OrdersListPage