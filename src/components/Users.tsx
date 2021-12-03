import axios from "axios";
import React, { useEffect, useState } from "react";
import { headers, User } from "../utils";
import UserForm from "./UserForm";

type UsersProps = {
  token: string;
};

const Users: React.FC<UsersProps> = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dUser, setdUser] = useState<User>({
    id: 0,
    username: "",
    role: "",
  });
  console.log(users);
  useEffect(() => {
    const getUsers = () => {
      fetchUsers();
    };
    getUsers();
    return () => {
      // cleanup
    };
  }, []);

  const fetchUsers = async () => {
    axios
      .get("http://localhost:9090/api/users", { headers })
      .then((response) => setUsers(response.data));
  };

  const createUser = (user: User) => {
    axios
      .post("http://localhost:9090/api/users", user, { headers })
      .then((response) => {
        console.log(response.data);
        fetchUsers();
      });
  };

  const updateUser = (user: User, id: number) => {
    axios
      .put("http://localhost:9090/api/users/" + id.toString(), user, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        fetchUsers();
      });
  };

  const deleteUser = (id: number) => {
    axios
      .delete("http://localhost:9090/api/users/" + id.toString(), { headers })
      .then((response) => {
        console.log(response.data);
        fetchUsers();
      });
  };

  const addUser = () => {
    setdUser({
      id: 0,
      username: "",
      password: "",
      role: "",
    });
    toggleModal();
  };

  const editUser = (editUser: any) => {
    editUser.password = "";
    setdUser(editUser);
    toggleModal();
  };

  const confirmDeleteUser = (editUser: User) => {
    if (
      window.confirm("Are you sure you want to delete " + editUser.username)
    ) {
      deleteUser(editUser.id);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <h1>Users</h1>
      <button className="btn btn-primary" onClick={addUser}>
        +
      </button>
      <table className="table-responsive table-hover table">
        <thead>
          <tr>
            <td>Username</td>
            <td>Role</td>
            <td>Reservations</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.username}</td>

              <td>{user.role}</td>
              <td>{user.reservations.length}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={(e) => editUser(user)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={(e) => confirmDeleteUser(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserForm
        show={showModal}
        toggleModal={toggleModal}
        user={dUser}
        createUser={createUser}
        updateUser={updateUser}
      />
    </>
  );
};

export default Users;
