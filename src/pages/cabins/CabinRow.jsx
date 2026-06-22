import { useState } from "react";
import EditCabinForm from "./EditCabinForm";

export default function CabinRow({ cabin, setSelectedCabin }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <tr>
        <td>
          <img src={cabin.image} alt={cabin.name} className="img" />
        </td>
        <td style={{ fontWeight: "600" }}>{cabin.name}</td>
        <td>Fits up to {cabin.maxcapacity} guests</td>
        <td style={{ fontWeight: "600" }}>${cabin.regularprice}</td>
        <td style={{ color: cabin.discount ? "#22c55e" : "#64748b" }}>
          {cabin.discount ? `$${cabin.discount}` : "—"}
        </td>
        <td>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="edit-btn"
              onClick={() => setShowForm((show) => !show)}
              style={{
                background: showForm ? "#475569" : "#3b82f6",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {showForm ? "Close" : "Edit"}
            </button>

            <button
              className="delete-btn"
              onClick={() => setSelectedCabin(cabin)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {showForm && (
        <tr>
          <td colSpan="6" style={{ background: "#0f172a", padding: "20px" }}>
            <EditCabinForm
              cabinToEdit={cabin}
              onCloseModal={() => setShowForm(false)}
            />
          </td>
        </tr>
      )}
    </>
  );
}
