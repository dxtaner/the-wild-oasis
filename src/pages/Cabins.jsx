import { useCabins } from "../features/cabins/useCabins";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import "./cabins.css";

export default function Cabins() {
  const { data, isLoading, error } = useCabins();
  const { mutate: deleteCabin } = useDeleteCabin();

  if (isLoading) return <p className="status">Loading cabins...</p>;
  if (error) return <p className="status error">Error loading cabins ❌</p>;

  return (
    <div className="cabins-page">
      <h1 className="title">🏨 Cabins</h1>

      <CreateCabinForm />

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((cabin) => (
              <tr key={cabin.id}>
                <td>
                  <img src={cabin.image} alt={cabin.name} className="img" />
                </td>

                <td>{cabin.name}</td>
                <td>{cabin.maxcapacity}</td>
                <td>${cabin.regularprice}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCabin(cabin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
