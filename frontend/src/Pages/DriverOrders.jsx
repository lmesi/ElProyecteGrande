import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const fetchDriverOrders = (id) => {
  return fetch(`/api/Driver/${id}`).then((res) => res.json());
};

const updateUnloadingDate = (orderId, date) => {
  return fetch(`/api/Orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unloadingDate: date }),
  });
};

const DriverOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderToShow, setOrderToShow] = useState();

  useEffect(() => {
    fetchDriverOrders(id)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddDate = (orderId, date) => {
    updateUnloadingDate(orderId, date)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        fetchDriverOrders(id).then((data) => {
          setOrders(data);
          setShowModal(false);
        });
      });
  };

  if (orders === null) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="titles">My orders</h1>
      <div className="row justify-content-center">
        <table className="table table-striped table-dark table-hover align-middle">
          <thead className="tableHead">
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
                  <button
                    id="loadingDateBtn"
                    className="editButton"
                    onClick={() => {
                      setShowModal(true);
                      setOrderToShow(order);
                    }}
                  >
                    Add unloading date
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <AddDateModal
          isOpen={setShowModal}
          onUpdate={handleAddDate}
          orderId={orderToShow.id}
          defaultDate={orderToShow.unloadingDate ?? new Date().toJSON()}
        />
      )}
    </div>
  );
};

const AddDateModal = ({ isOpen, onUpdate, orderId, defaultDate }) => {
  const [date, setDate] = useState(defaultDate.split("T")[0]);

  return (
    <div className="blackout">
      <div className="popup date-modal-container">
        <h3>Add unloading date</h3>
        <input
          className="form-control"
          id="dateInput"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <div>
          <button
            className="deleteButtonForPopUp"
            onClick={() => onUpdate(orderId, date)}
          >
            Save
          </button>
          <button
            className="cancelButtonForPopUp"
            onClick={() => isOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverOrders;