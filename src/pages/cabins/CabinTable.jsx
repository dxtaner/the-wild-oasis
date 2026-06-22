import CabinRow from "./CabinRow.jsx";

export default function CabinTable({ cabins, setSelectedCabin }) {
  if (cabins.length === 0) {
    return <p className="status">No cabins found matching criteria.</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Cabin</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cabins.map((cabin) => (
            <CabinRow
              key={cabin.id}
              cabin={cabin}
              setSelectedCabin={setSelectedCabin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
