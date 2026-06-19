import { useState } from "react";
import { useUsers } from "../../features/users/useUsers";
import { useDeleteUser } from "../../features/users/useDeleteUser";
import { useCreateUser } from "../../features/users/useCreateUser";
import { useUpdateUser } from "../../features/users/useUpdateUser";
import UsersTable from "./UsersTable";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

import "./users.css";

export default function Users() {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "active",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
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

  function handleEditChange(e) {
    setEditFormData({
      ...editFormData,
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

  function handleUpdateUser(e) {
    e.preventDefault();
    updateUser({
      id: editingUser.id,
      updatedUser: editFormData,
    });
    setEditingUser(null);
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1>👤 Users</h1>
          <p>Manage hotel users</p>
        </div>
        <button className="add-user-btn" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>

      <UsersTable
        users={users}
        setEditingUser={setEditingUser}
        setEditFormData={setEditFormData}
        setSelectedUser={setSelectedUser}
      />

      <CreateUserModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        handleChange={handleChange}
        handleCreateUser={handleCreateUser}
      />

      <EditUserModal
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        editFormData={editFormData}
        handleEditChange={handleEditChange}
        handleUpdateUser={handleUpdateUser}
      />

      <DeleteUserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}
