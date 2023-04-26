import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const UserForm = ({ onSave, user, isDisabled }) => {
  const ROLES = [
    { label: "Select a role", value: "" },
    { label: "admin", value: 1 },
    { label: "driver", value: 0 },
  ];

  const [userRole, setUserRole] = useState(user?.role);
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries());
    user["role"] = Number(userRole);
    if (!user?.licensePlate) user["licensePlate"] = "";
    if (!user?.password) user["password"] = "";
    onSave(user, id);
  };

  const shouldDisableLicensePlate = useMemo(() => {
    if (userRole == "1") {
      return true;
    }
    return false;
  }, [userRole]);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="userName">Name</label>
        <input
          id="userName"
          name="name"
          defaultValue={user ? user.name : null}
        />
      </div>
      {!user && (
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" />
        </div>
      )}
      <div>
        <Dropdown
          options={ROLES}
          label={"Role"}
          value={userRole}
          setValue={setUserRole}
        />
      </div>
      <div>
        <label htmlFor="licensePlate">License plate</label>
        <input
          id="licensePlate"
          name="licensePlate"
          disabled={shouldDisableLicensePlate}
          defaultValue={user ? user?.licensePlate : null}
        />
      </div>
      <button type="submit" disabled={isDisabled}>
        Save
      </button>
      <button type="reset" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
