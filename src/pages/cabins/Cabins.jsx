import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../../features/cabins/useCabins";
import { useDeleteCabin } from "../../features/cabins/useDeleteCabin";
import CabinTable from "./CabinTable.jsx";
import CreateCabinForm from "./CreateCabinForm";
import DeleteCabinModal from "./DeleteCabinModal";
import Filter from "./Filter";
import SortBy from "./SortBy";
import "./cabins.css";

export default function Cabins() {
  const { data = [], isLoading, error } = useCabins();
  const { mutate: deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  const [searchParams] = useSearchParams();

  const [selectedCabin, setSelectedCabin] = useState(null);

  if (isLoading) {
    return (
      <div className="cabins-loading">
        <div className="spinner"></div>
        <p>Loading premium cabins...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cabins-error-container">
        <p className="status error">Error loading cabins ❌</p>
      </div>
    );
  }

  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = data;

  if (filterValue === "no-discount") {
    filteredCabins = data.filter(
      (cabin) => cabin.discount === 0 || !cabin.discount,
    );
  }
  if (filterValue === "with-discount") {
    filteredCabins = data.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const valueA = a[field.toLowerCase()];
    const valueB = b[field.toLowerCase()];

    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * modifier;
    }
    return (valueA - valueB) * modifier;
  });

  return (
    <div className="cabins-page">
      <div className="cabins-header">
        <div className="header-title-zone">
          <h1 className="title">🏨 Cabins Management</h1>
          <p className="subtitle">
            Review, update, and optimize your hotel luxury suites.
          </p>
        </div>

        <div className="table-operations">
          <Filter
            filterField="discount"
            options={[
              { value: "all", label: "All Cabins" },
              { value: "no-discount", label: "No discount" },
              { value: "with-discount", label: "With discount" },
            ]}
          />

          <SortBy
            options={[
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularprice-asc", label: "Sort by price (low first)" },
              {
                value: "regularprice-desc",
                label: "Sort by price (high first)",
              },
              {
                value: "maxcapacity-asc",
                label: "Sort by capacity (low first)",
              },
              {
                value: "maxcapacity-desc",
                label: "Sort by capacity (high first)",
              },
            ]}
          />
        </div>
      </div>

      <div className="form-section-wrapper">
        <CreateCabinForm />
      </div>

      <CabinTable cabins={sortedCabins} setSelectedCabin={setSelectedCabin} />

      <DeleteCabinModal
        selectedCabin={selectedCabin}
        setSelectedCabin={setSelectedCabin}
        deleteCabin={deleteCabin}
        isDeleting={isDeleting}
      />
    </div>
  );
}
