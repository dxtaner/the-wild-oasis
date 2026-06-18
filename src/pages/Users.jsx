import { useState } from "react";
import { useUsers } from "../features/users/useUsers";
import { useDeleteUser } from "../features/users/useDeleteUser";
import { useCreateUser } from "../features/users/useCreateUser";
import "./users.css";

export default function Users() {
  const { data: users = [], isLoading } = useUsers();

  const { mutate: deleteUser } = useDeleteUser();

  const { mutate: createUser } = useCreateUser();

  const [selectedUser, setSelectedUser] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "active",
  });

  if (isLoading) {
    return (
      <div className="users-loading">
        <div className="spinner"></div>

        <p>Loading users...</p>
      </div>
    );
  }

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  function handleCreateUser(e) {
    e.preventDefault();

    createUser(formData);

    setShowForm(false);

    setFormData({
      name: "",
      email: "",
      role: "Staff",
      status: "active",
    });
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1>👤 Users</h1>

          <p>Manage system users and roles</p>
        </div>

        <button className="add-user-btn" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>

      {/* TABLE */}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">
                  <div className="avatar">{user.name.charAt(0)}</div>

                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>
                  <span className="role">{user.role}</span>
                </td>

                <td>
                  <span className={`user-status ${user.status}`}>
                    {user.status}
                  </span>
                </td>

                <td>
                  <div className="user-actions">
                    <button className="edit-btn">Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => setSelectedUser(user)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete User</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedUser.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={() => {
                  deleteUser(selectedUser.id);

                  setSelectedUser(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create User</h2>

            <form className="create-user-form" onSubmit={handleCreateUser}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <select name="role" value={formData.role} onChange={handleChange}>
                <option>Admin</option>
                <option>Manager</option>
                <option>Receptionist</option>
                <option>Staff</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
