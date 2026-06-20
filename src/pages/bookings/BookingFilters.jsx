export default function BookingFilters({ currentFilter, onFilterChange }) {
  const filters = ["all", "confirmed", "pending", "cancelled"];

  return (
    <div className="filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? "active" : ""}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
