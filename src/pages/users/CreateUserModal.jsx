import "./CreateUserModal.css";

export default function CreateUserModal({
  showForm,
  setShowForm,
  formData,
  handleChange,
  handleCreateUser,
}) {
  if (!showForm) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create User</h2>

        <form className="user-form" onSubmit={handleCreateUser}>
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

          <input
            type="url"
            name="avatar_url"
            placeholder="Avatar Image URL (e.g., https://...)"
            value={formData.avatar_url || ""}
            onChange={handleChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Receptionist</option>
            <option>Staff</option>
          </select>

          <select name="status" value={formData.status} onChange={handleChange}>
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
  );
}
