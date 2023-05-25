import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../Components/Dropdown";
import "../css/Users.css";

const fetchUsers = () => {
  return fetch("/api/Users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
};

const deleteUser = (id) => {
  return fetch(`/api/Users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
    { label: "Admin", value: 1 },
    { label: "Driver", value: 0 },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") == "1") {
      fetchUsers()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      localStorage.clear();
      navigate("/");
    }
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

  return (
    <div className="tableContainer">
      {users === null ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1 className="titles">Users</h1>
          <div className="row justify-content-center">
            <div className="searchBar drop-container">
              <label className="searchBar-flex-item">
                Search for user name:{" "}
              </label>
              <input
                className="searchBar-flex-item searchField"
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
            </div>
          </div>
          <div className="row justify-content-center">
            <table className="table table-striped table-dark table-hover">
              <thead className="tableHead">
                <tr>
                  <th>
                    <button className="headButton" onClick={handleOrderBy}>
                      Name {orderDirection === "ASC" ? "▲" : "▼"}
                    </button>
                  </th>
                  <th>Role</th>
                  <th>License Plate</th>
                  <th />
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
                      <td>{user.name}</td>
                      <td>{user.role === 1 ? "Admin" : "Driver"}</td>
                      <td>{user.licensePlate}</td>
                      <td>
                        <Link to={`/admin/users/update/${user.id}`}>
                          <button className="editButton">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="deleteButton"
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
          </div>
          {showModal && (
            <Modal
              close={setShowModal}
              onDelete={handleDeleteUser}
              id={userToDelete.id}
              name={userToDelete.name}
            />
          )}
        </div>
      )}
    </div>
  );
};

const Modal = ({ close, onDelete, id, name }) => {
  return (
    <div className="blackout">
      <div className="popup">
        <h3>Would You like to delete the user named "{name}"?</h3>
        <button className="deleteButtonForPopUp" onClick={() => onDelete(id)}>
          Delete
        </button>
        <button className="cancelButtonForPopUp" onClick={() => close(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Users;
