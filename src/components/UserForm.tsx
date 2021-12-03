import React, { useEffect, useState } from "react";
import { setEnabled, User } from "../utils";

type UserFormProps = {
  show: boolean;
  toggleModal: any;
  createUser: any;
  updateUser: any;
  user?: User | undefined;
};

const UserForm: React.FC<UserFormProps> = ({
  show,
  toggleModal,
  createUser,
  updateUser,
  user,
}) => {
  const [dUser, setdUser] = useState<User>({
    id: 0,
    username: "",
    role: "",
  });
  const [roles, setRoles] = useState([
    { id: "REG_USER", name: "user" },
    { id: "ADMIN", name: "admin" },
  ]);

  useEffect(() => {
    setdUser(
      user || {
        id: 0,
        username: "",
        password: "",
        role: "",
      }
    );

    return () => {
      //cleanup
    };
  }, [user]);

  const handleChange = (e: any) => {
    // need a way to update date inputs
    const name = e.target.name;
    let value: any;
    if (e.target.type === "checkbox") {
      value = e.target.value.length > 0;
    } else {
      value = e.target.value;
    }
    setdUser({ ...dUser, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setdUser(setEnabled(dUser));
    if (dUser.id) {
      updateUser(dUser, dUser.id);
    } else {
      createUser(dUser);
      toggleModal();
    }
  };

  return (
    <>
      <div
        className={"modal fade" + (show ? " show" : "")}
        style={{ display: show ? "block" : "" }}
        data-modal-color=""
        id="modalColor"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">
                  {dUser.id ? "Edit" : "Add"} User
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="user-name" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="user-name"
                    name="username"
                    onChange={handleChange}
                    value={dUser.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user-password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="user-password"
                    name="password"
                    onChange={handleChange}
                    value={dUser.password}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user-role" className="col-form-label">
                    Role:
                  </label>
                  <select
                    className="form-control"
                    id="user-role"
                    name="role"
                    onChange={handleChange}
                  >
                    {roles.map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="user-enabled" className="col-form-label">
                    Enabled:
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="user-enabled"
                    name="enabled"
                    onClick={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
