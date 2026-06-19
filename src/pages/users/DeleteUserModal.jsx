import "./DeleteUserModal.css";

export default function DeleteUserModal({
  selectedUser,
  setSelectedUser,
  deleteUser,
}) {
  if (!selectedUser) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <div className="delete-icon">⚠️</div>

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete
          <strong> {selectedUser.name}</strong>?
        </p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setSelectedUser(null)}>
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
  );
}
