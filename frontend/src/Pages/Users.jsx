import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const fetchAdmins = () => {
  return fetch("/api/Users/admin").then((res) => res.json());
};

const fetchDrivers = () => {
  return fetch("/api/Users/driver").then((res) => res.json());
};

const deleteUser = (id) => {
  return fetch(`/api/Users/admin/${id}`, {
    method: "DELETE",
  });
};

const Users = () => {
  const [users, setUsers] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAdmins().then((admins) => {
      setUsers(admins);
      console.log(users);
    });

    /* fetchDrivers().then((drivers) => {
      const data = [...users, ...drivers];
      setUsers(data);
      console.log(users);
    }); */
  }, []);

  const handleDeleteUser = (id) => {
    deleteUser(id).catch((error) => {
      console.log(error);
    });

    setUsers((users) => {
      return users.filter((user) => user.id !== id);
    });

    setShowModal(false);
  };

  if (users === null) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>License Plate</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role === 1 ? "Admin" : "Driver"}</td>
              <td>{user?.plate}</td>
              <td>
                <Link to={`/admin/users/update/${user.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => setShowModal(true)}>Delete</button>
                {showModal && (
                  <Modal
                    close={setShowModal}
                    onDelete={handleDeleteUser}
                    id={user.id}
                    name={user.name}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Modal = ({ close, onDelete, id, name }) => {
  return (
    <div className="blackout">
      <div className="modal">
        <p>
          Ara you sure you want to delete {name} user with id {id}?
        </p>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => close(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Users;
