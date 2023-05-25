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
    <form className="userForm" onSubmit={onSubmit}>
      <div className="form-group">
        <label>
          Name:
          <input
            className="form-control"
            id="userName"
            name="name"
            defaultValue={user ? user.name : null}
          />
        </label>
      </div>
      {!user && (
        <div className="form-group">
          <label>
            Password:
            <input 
                className="form-control" 
                id="password" 
                name="password1"
                type="password"
            />
          </label>
          <label>
            Confirm password:
            <input
                className="form-control"
                id="password2"
                name="password2"
                type="password"
            />
            {/*MAKE SURE THEY ARE THE SAME!!!*/}
          </label>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="licensePlate">
          License plate:
          <input
            className="form-control"
            id="licensePlate"
            name="licensePlate"
            disabled={shouldDisableLicensePlate}
            defaultValue={user ? user?.licensePlate : null}
          />
        </label>
      </div>
      <Dropdown
        options={ROLES}
        label={""}
        value={userRole}
        setValue={setUserRole}
      />
      <div className="form-btn-container">
        <button className="btn btn-primary" type="submit" disabled={isDisabled}>
          Save
        </button>
        <button
          className="btn btn-secondary"
          type="reset"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
