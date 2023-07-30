import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/user");
    setUser(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/user/${userId}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => {
            return (
              <tr key={item.uuid}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Link
                    to={`/users/edit/${item.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(item.uuid)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
