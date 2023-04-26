import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import Dropdown from "../Components/Dropdown";

const fetchUsers = () => {
  return fetch("/api/Users").then((res) => res.json());
};

const deleteUser = (id) => {
  return fetch(`/api/Users/${id}`, {
    method: "DELETE",
  });
};

const sortByName = (a, b, order) => {
  const changeOrder = order === "DESC" ? -1 : 1;
  if (a < b) return -1 * changeOrder;
  if (a === b) return 0;
  return 1 * changeOrder;
};

const Users = () => {
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [orderDirection, setOrderDirection] = useState("ASC");
  const ROLES = [
    { label: "All", value: "" },
    { label: "admin", value: 1 },
    { label: "driver", value: 0 },
  ];

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    deleteUser(id)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchUsers()
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });

    setShowModal(false);
  };

  const handleOrderBy = () => {
    const newDirection = orderDirection === "ASC" ? "DESC" : "ASC";
    setOrderDirection(newDirection);
  };

  if (users === null) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Users</h1>
      <label>Search for user name: </label>
      <input
        type="text"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <Dropdown
        label={"Filter by role: "}
        options={ROLES}
        value={searchRole}
        setValue={setSearchRole}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
              Name <button onClick={handleOrderBy}>{orderDirection}</button>
            </th>
            <th>Role</th>
            <th>License Plate</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .filter((user) => {
              if (searchRole === "") return true;
              return searchRole == user.role;
            })
            .sort((a, b) => sortByName(a.name, b.name, orderDirection))
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role === 1 ? "Admin" : "Driver"}</td>
                <td>{user.licensePlate}</td>
                <td>
                  <Link to={`/admin/users/update/${user.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setUserToDelete(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          close={setShowModal}
          onDelete={handleDeleteUser}
          id={userToDelete.id}
          name={userToDelete.name}
        />
      )}
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
