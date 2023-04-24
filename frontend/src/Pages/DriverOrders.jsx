import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const fetchDriverOrders = (id) => {
  return fetch(`/api/Driver/${id}`).then((res) => res.json());
};

const DriverOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchDriverOrders(id).then((data) => {
      setOrders(data);
    });
  }, []);

  if (orders === null) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>My orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Company name</th>
            <th>Loading address</th>
            <th>Unloading address</th>
            <th>Unloading date</th>
            <th>Goods</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.companyName}</td>
              <td>{order.loadingAddress}</td>
              <td>{order.unloadingAddress}</td>
              <td>{order.unloadingDate?.split("T")[0] ?? "uncompleted"}</td>
              <td>{order.goodsName}</td>
              <td>
                <button>Add unloading date</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverOrders;
