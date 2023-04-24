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
    }, []);

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
                            <td><button onClick={OrderUpdatePage}>Edit</button></td>
                            <td><button onClick={Delete}>Delete</button></td>
                        </tr>))}
                    </tbody>
                </table></div> : <h1>Loading...</h1>}
        </div>
    )
}

export default OrdersListPage