import React, { useEffect, useState } from "react";
import UserForm from "../Components/UserForm";
import { useNavigate } from "react-router-dom";

const addUser = (user) => {
  return fetch("/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });
};

const AddUser = () => {
  const [addLoading, setAddLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== "1") {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  const handleAddUser = (user) => {
    setAddLoading(true);
    addUser(user)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card card-custom">
          <h1>Add New User</h1>
          <UserForm onSave={handleAddUser} isDisabled={addLoading} />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
