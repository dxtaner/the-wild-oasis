import "./EditUserModal.css";

export default function EditUserModal({
  editingUser,
  setEditingUser,
  editFormData,
  handleEditChange,
  handleUpdateUser,
}) {
  if (!editingUser) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit User</h2>

        <form className="user-form" onSubmit={handleUpdateUser}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={editFormData.name}
            onChange={handleEditChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editFormData.email}
            onChange={handleEditChange}
            required
          />

          <select
            name="role"
            value={editFormData.role}
            onChange={handleEditChange}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Receptionist</option>
            <option>Staff</option>
          </select>

          <select
            name="status"
            value={editFormData.status}
            onChange={handleEditChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
