import { useState } from "react";
import { useUpdateCabin } from "../../features/cabins/useUpdateCabin";
import "./createCabin.css";

export default function EditCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const { updateCabin, isUpdating } = useUpdateCabin();

  const [formData, setFormData] = useState({
    name: editValues.name || "",
    maxcapacity: editValues.maxcapacity || "",
    regularprice: editValues.regularprice || "",
    discount: editValues.discount || 0,
    image: editValues.image || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "maxcapacity" || name === "regularprice" || name === "discount"
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCabin(
      { newCabinData: formData, id: editId },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="cabin-form"
      style={{
        marginTop: "10px",
        boxShadow: "none",
        border: "1px solid #1f2937",
      }}
    >
      <h3 className="form-title" style={{ color: "#3b82f6" }}>
        ✏️ Edit Cabin: {editValues.name}
      </h3>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Cabin name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isUpdating}
        />
        <input
          type="number"
          name="maxcapacity"
          placeholder="Maximum capacity"
          className="input"
          value={formData.maxcapacity}
          onChange={handleChange}
          required
          disabled={isUpdating}
        />
        <input
          type="number"
          name="regularprice"
          placeholder="Regular price"
          className="input"
          value={formData.regularprice}
          onChange={handleChange}
          required
          disabled={isUpdating}
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          className="input"
          value={formData.discount}
          onChange={handleChange}
          disabled={isUpdating}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input"
          value={formData.image}
          onChange={handleChange}
          disabled={isUpdating}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <button
          type="button"
          className="btn"
          style={{ background: "#475569", color: "white" }}
          onClick={onCloseModal}
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          style={{ background: "#3b82f6", color: "white" }}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
