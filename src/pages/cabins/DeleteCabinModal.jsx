import "./DeleteCabinModal.css";

export default function DeleteCabinModal({
  selectedCabin,
  setSelectedCabin,
  deleteCabin,
  isDeleting,
}) {
  if (!selectedCabin) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <div className="delete-icon">⚠️</div>

        <h2>Delete Cabin</h2>

        <p>
          Are you sure you want to delete
          <strong> {selectedCabin.name}</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setSelectedCabin(null)}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            disabled={isDeleting}
            onClick={() => {
              deleteCabin(selectedCabin.id, {
                onSuccess: () => setSelectedCabin(null), // Silme başarılıysa modalı kapat
              });
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
