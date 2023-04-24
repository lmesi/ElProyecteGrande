import React, { useState } from "react";
import Dropdown from "../Components/Dropdown";
import UserForm from "../Components/UserForm";
import { useNavigate } from "react-router-dom";

const addUser = (user) => {
  return fetch("/api/Users/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const AddUser = () => {
  const [addLoading, setAddLoading] = useState(false);
  const navigate = useNavigate();

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
    <div>
      <h1>Add new user</h1>
      <UserForm onSave={handleAddUser} isDisabled={addLoading} />
    </div>
  );
};

export default AddUser;
