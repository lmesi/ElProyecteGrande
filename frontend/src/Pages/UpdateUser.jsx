import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../Components/UserForm";

const fetchUsers = (id) => {
  return fetch(`/api/Users/${id}`).then((res) => res.json());
};

const update = (user, id) => {
  return fetch(`/api/Users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(id)
      .then((admin) => {
        setUser(admin);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdateUser = (user, id) => {
    setUpdateLoading(true);
    update(user, id)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (user === null) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Update user</h1>
      <UserForm
        onSave={handleUpdateUser}
        user={user}
        isDisabled={updateLoading}
      />
    </div>
  );
};

export default UpdateUser;
