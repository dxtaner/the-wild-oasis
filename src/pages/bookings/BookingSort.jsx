export default function BookingSort({ currentSort, onSortChange }) {
  return (
    <div className="sort-container">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="date-desc">Sort by date (recent first)</option>

        <option value="date-asc">Sort by date (earlier first)</option>

        <option value="amount-desc">Sort by amount (high first)</option>

        <option value="amount-asc">Sort by amount (low first)</option>
      </select>
    </div>
  );
}
